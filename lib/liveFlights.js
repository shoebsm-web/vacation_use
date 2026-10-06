// ============================================================
// LIVE FLIGHT PRICES - shared by server.js and Vercel
// ------------------------------------------------------------
// Plain English: this file asks Google Flights (through a free
// middleman service) for real prices, every single time.
//
// Order we try them in:
//   1. SearchAPI.io  (free: 100 searches/month)  -> SEARCHAPI_KEY
//   2. SerpApi       (free: 250 searches/month)  -> SERPAPI_KEY
// If #1 fails or runs out, #2 is tried automatically.
// Nothing is cached: every search = a fresh live call.
// Keys are read from environment variables ONLY (never the browser).
// ============================================================

const SEARCHAPI_URL = process.env.SEARCHAPI_URL || 'https://www.searchapi.io/api/v1/search';
const SERPAPI_URL = process.env.SERPAPI_URL || 'https://serpapi.com/search.json';
const TIMEOUT_MS = 25000;

const IATA = /^[A-Z]{3}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

// Some dashboard codes are city codes or typos -> real airports
const AIRPORT_FIX = { NYC: 'JFK', CRC: 'SJO' };

function validate({ from, to, depart, ret }) {
  if (!IATA.test(from || '')) return 'from must be a 3-letter airport code (e.g. DFW)';
  if (!IATA.test(to || '')) return 'to must be a 3-letter airport code (e.g. CUN)';
  if (!DATE.test(depart || '')) return 'depart must be YYYY-MM-DD';
  if (ret && !DATE.test(ret)) return 'return must be YYYY-MM-DD';
  const today = new Date().toISOString().slice(0, 10);
  if (depart < today) return `depart date ${depart} is in the past - pick a future trip`;
  if (ret && ret < depart) return 'return date is before depart date';
  return null;
}

async function getJson(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const r = await fetch(url, { signal: ctrl.signal });
    const text = await r.text();
    let body;
    try { body = JSON.parse(text); } catch { body = { error: text.slice(0, 200) }; }
    if (!r.ok || body.error) {
      throw new Error(`${r.status} ${typeof body.error === 'string' ? body.error : JSON.stringify(body.error || body).slice(0, 200)}`);
    }
    return body;
  } finally {
    clearTimeout(timer);
  }
}

// ---------- Providers ----------
const providers = [
  {
    name: 'SearchAPI.io',
    key: () => process.env.SEARCHAPI_KEY,
    url: (q, key) => {
      const p = new URLSearchParams({
        engine: 'google_flights', api_key: key,
        departure_id: q.from, arrival_id: q.to, outbound_date: q.depart,
        flight_type: q.ret ? 'round_trip' : 'one_way',
        currency: 'USD', adults: '1', travel_class: 'economy',
        stops: 'one_stop_or_fewer',
      });
      if (q.ret) p.set('return_date', q.ret);
      return `${SEARCHAPI_URL}?${p}`;
    },
  },
  {
    name: 'SerpApi',
    key: () => process.env.SERPAPI_KEY,
    url: (q, key) => {
      const p = new URLSearchParams({
        engine: 'google_flights', api_key: key,
        departure_id: q.from, arrival_id: q.to, outbound_date: q.depart,
        type: q.ret ? '1' : '2', currency: 'USD', hl: 'en', gl: 'us',
        adults: '1', stops: '2', // 2 = one stop or fewer
      });
      if (q.ret) p.set('return_date', q.ret);
      return `${SERPAPI_URL}?${p}`;
    },
  },
];

function fmtDuration(mins) {
  if (!Number.isFinite(mins)) return '';
  return `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, '0')}m`;
}

// Both services return Google Flights' shape: best_flights + other_flights
function normalize(body, providerName) {
  const groups = [
    ...(body.best_flights || []).map(f => ({ ...f, _best: true })),
    ...(body.other_flights || []),
  ];
  const flights = groups
    .filter(g => Number.isFinite(g.price) && Array.isArray(g.flights) && g.flights.length)
    .map(g => {
      const legs = g.flights;
      const airlines = [...new Set(legs.map(l => l.airline).filter(Boolean))];
      const first = legs[0], last = legs[legs.length - 1];
      return {
        airline: airlines.join(' / ') || 'Unknown',
        airlineLogo: g.airline_logo || first.airline_logo || null,
        price: Math.round(g.price),
        stops: Math.max(0, legs.length - 1),
        durationMins: g.total_duration ?? null,
        duration: fmtDuration(g.total_duration),
        departTime: first.departure_airport?.time || null,
        arriveTime: last.arrival_airport?.time || null,
        flightNumbers: legs.map(l => l.flight_number).filter(Boolean),
        layovers: (g.layovers || []).map(l => ({ airport: l.id || l.name, mins: l.duration })),
        isBest: !!g._best,
        source: `Google Flights via ${providerName}`,
      };
    });

  const pi = body.price_insights || {};
  return {
    flights,
    insights: {
      lowestPrice: pi.lowest_price ?? null,
      priceLevel: pi.price_level ?? null,          // "low" | "typical" | "high"
      typicalRange: pi.typical_price_range ?? null, // [min, max]
    },
  };
}

async function searchLiveFlights(input) {
  const q = {
    from: String(input.from || '').toUpperCase().trim(),
    to: String(input.to || '').toUpperCase().trim(),
    depart: String(input.depart || '').trim(),
    ret: input.ret ? String(input.ret).trim() : '',
  };
  q.to = AIRPORT_FIX[q.to] || q.to;
  q.from = AIRPORT_FIX[q.from] || q.from;

  const bad = validate(q);
  if (bad) { const e = new Error(bad); e.status = 400; throw e; }

  const attempts = [];
  for (const p of providers) {
    const key = p.key();
    if (!key) { attempts.push(`${p.name}: no key set`); continue; }
    try {
      const body = await getJson(p.url(q, key));
      const { flights, insights } = normalize(body, p.name);
      flights.sort((a, b) => a.stops - b.stops || a.price - b.price); // nonstop first, then cheapest
      return {
        live: true, provider: p.name, fetchedAt: new Date().toISOString(),
        query: q, count: flights.length, insights, flights,
      };
    } catch (err) {
      // never echo the key back
      attempts.push(`${p.name}: ${String(err.message).replaceAll(key, '***')}`);
    }
  }
  const e = new Error(`No live provider worked. ${attempts.join(' | ')}`);
  e.status = 502;
  e.attempts = attempts;
  throw e;
}

function providerStatus() {
  return providers.map(p => ({ name: p.name, configured: !!p.key() }));
}

module.exports = { searchLiveFlights, providerStatus, normalize };
