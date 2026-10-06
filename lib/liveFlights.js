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
// Identical searches are shared for 30 minutes (protects the free quota
// when many people use the site); every result shows when it was fetched.
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
  // "today" with a 14h cushion so US evening searches for today's date still work
  const today = new Date(Date.now() - 14 * 3600e3).toISOString().slice(0, 10);
  const maxDay = new Date(Date.now() + 330 * 86400e3).toISOString().slice(0, 10);
  if (depart < today) return `depart date ${depart} is in the past - pick a future trip`;
  if (depart > maxDay) return 'Not on sale yet - airlines only sell about 11 months ahead';
  if (ret && ret < depart) return 'return date is before depart date';
  return null;
}

// Strip anything that could be read as HTML from text that came from outside
const clean = v => (v == null ? v : String(v).replace(/[<>"`]/g, '').slice(0, 120));

// Small in-memory cache (per server instance) - identical searches within 30 min reuse the result
const CACHE_MS = 30 * 60 * 1000;
const cache = new Map();
function cached(key, fn) {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_MS) return Promise.resolve({ ...hit.value, cached: true });
  return fn().then(v => { cache.set(key, { at: Date.now(), value: v }); if (cache.size > 500) cache.delete(cache.keys().next().value); return v; });
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
        airline: clean(airlines.join(' / ')) || 'Unknown',
        airlineLogo: g.airline_logo || first.airline_logo || null,
        price: Math.round(g.price),
        stops: Math.max(0, legs.length - 1),
        durationMins: g.total_duration ?? null,
        duration: fmtDuration(g.total_duration),
        departTime: clean(first.departure_airport?.time) || null,
        arriveTime: clean(last.arrival_airport?.time) || null,
        flightNumbers: legs.map(l => clean(l.flight_number)).filter(Boolean),
        layovers: (g.layovers || []).map(l => ({ airport: clean(l.id || l.name), mins: l.duration })),
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
      // [[unixSeconds, price], ...] - Google's real recent price history for this route/date
      priceHistory: Array.isArray(pi.price_history) ? pi.price_history : [],
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
  return cached(`s|${q.from}|${q.to}|${q.depart}|${q.ret}`, () => searchUncached(q));
}

async function searchUncached(q) {

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

// ============================================================
// EXPLORE: "Where can I fly from DFW on these dates?" - one search returns
// dozens of real destinations with live flight + hotel prices (Google Travel Explore)
// ============================================================
const INTERESTS = { beaches: 'beaches', outdoors: 'outdoors', museums: 'museums', history: 'history', skiing: 'skiing' };
async function exploreDestinations(input) {
  const key = process.env.SERPAPI_KEY;
  if (!key) { const e = new Error('SERPAPI_KEY not set'); e.status = 502; throw e; }
  const from = String(input.from || '').toUpperCase().trim();
  if (!IATA.test(from)) { const e = new Error('from must be a 3-letter airport code'); e.status = 400; throw e; }
  if (input.depart && input.ret) {
    const bad = validate({ from, to: 'XXX', depart: input.depart, ret: input.ret });
    if (bad) { const e = new Error(bad); e.status = 400; throw e; }
  }
  return cached(`e|${from}|${input.depart}|${input.ret}|${input.stops || ''}`, () => exploreUncached(from, input, key));
}

async function exploreUncached(from, input, key) {
  const p = new URLSearchParams({ engine: 'google_travel_explore', api_key: key, departure_id: from,
    currency: 'USD', hl: 'en', gl: 'us', type: '1' });
  if (input.depart && DATE.test(input.depart) && input.ret && DATE.test(input.ret)) {
    p.set('outbound_date', input.depart); p.set('return_date', input.ret);
  }
  if (INTERESTS[input.interest]) p.set('interest', INTERESTS[input.interest]);
  if (input.stops === 'nonstop') p.set('stops', '1');
  let body;
  try { body = await getJson(`${SERPAPI_URL}?${p}`); }
  catch (err) { const e = new Error('SerpApi explore: ' + String(err.message).replaceAll(key, '***')); e.status = 502; throw e; }
  const destinations = (body.destinations || [])
    .filter(d => Number.isFinite(d.flight_price))
    .map(d => ({
      name: clean(d.name), country: clean(d.country) || '', code: d.destination_airport && /^[A-Z]{3}$/.test(d.destination_airport.code) ? d.destination_airport.code : null,
      lat: d.gps_coordinates ? d.gps_coordinates.latitude : null,
      thumbnail: /^https:\/\/[^\s"'<>]+$/.test(d.thumbnail || '') ? d.thumbnail : null, start: DATE.test(d.start_date || '') ? d.start_date : null, end: DATE.test(d.end_date || '') ? d.end_date : null,
      flightPrice: Math.round(d.flight_price), hotelPrice: Number.isFinite(d.hotel_price) ? Math.round(d.hotel_price) : null,
      flightMins: d.flight_duration ?? null, stops: d.number_of_stops ?? null, airline: clean(d.airline) || '',
    }));
  return { live: true, provider: 'SerpApi (Google Travel Explore)', fetchedAt: new Date().toISOString(), count: destinations.length, destinations };
}

// How many free searches are left this month (SerpApi account API - free, does not use a search)
async function getQuota() {
  const key = process.env.SERPAPI_KEY;
  if (!key) return { provider: 'SerpApi', configured: false };
  const acct = await getJson(`${process.env.SERPAPI_ACCOUNT_URL || 'https://serpapi.com/account.json'}?api_key=${encodeURIComponent(key)}`);
  return {
    provider: 'SerpApi', configured: true,
    searchesLeft: acct.total_searches_left ?? acct.plan_searches_left ?? null,
    perMonth: acct.searches_per_month ?? null,
    usedThisMonth: acct.this_month_usage ?? null,
  };
}

function providerStatus() {
  return providers.map(p => ({ name: p.name, configured: !!p.key() }));
}

module.exports = { searchLiveFlights, providerStatus, normalize, getQuota, exploreDestinations };
