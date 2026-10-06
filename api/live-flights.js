// Vercel serverless function: LIVE flight prices
// GET /api/live-flights?from=DFW&to=CUN&depart=2026-11-26&return=2026-12-03
// GET /api/live-flights?explore=1&from=DFW&depart=...&return=...  -> every destination
// GET /api/live-flights?status=1 | ?quota=1
// Keys come from Vercel env vars: SEARCHAPI_KEY, SERPAPI_KEY
const { searchLiveFlights, providerStatus, getQuota, exploreDestinations } = require('../lib/liveFlights');

// Only our own pages may call this API from a browser
const ALLOWED = [/^https:\/\/vacation-use[a-z0-9-]*\.vercel\.app$/, /^https:\/\/shoebsm-web\.github\.io$/, /^http:\/\/localhost(:\d+)?$/];

// Simple per-visitor limit (per server instance): protects the free monthly quota
const LIMIT = 25, WINDOW_MS = 60 * 60 * 1000;
const hits = new Map();
function overLimit(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter(t => now - t < WINDOW_MS);
  list.push(now); hits.set(ip, list);
  if (hits.size > 5000) hits.delete(hits.keys().next().value);
  return list.length > LIMIT;
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  if (ALLOWED.some(r => r.test(origin))) { res.setHeader('Access-Control-Allow-Origin', origin); res.setHeader('Vary', 'Origin'); }
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET only' });

  const q = req.query || {};
  const noStore = () => res.setHeader('Cache-Control', 'no-store');
  // Successful price results are shared at the edge for 30 min (saves the free quota)
  const shareable = () => res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=1800, stale-while-revalidate=300');

  if (q.status) { noStore(); return res.status(200).json({ ok: true, providers: providerStatus() }); }
  if (q.quota) {
    noStore();
    try { return res.status(200).json(await getQuota()); }
    catch (err) { return res.status(502).json({ error: err.message.replace(process.env.SERPAPI_KEY || '~', '***') }); }
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (overLimit(ip)) { noStore(); return res.status(429).json({ live: false, error: 'Too many searches from your connection - please try again in an hour.' }); }

  try {
    const data = q.explore
      ? await exploreDestinations({ from: q.from, depart: q.depart, ret: q.return, stops: q.stops })
      : await searchLiveFlights({ from: q.from, to: q.to, depart: q.depart, ret: q.return });
    shareable();
    return res.status(200).json(data);
  } catch (err) {
    noStore();
    return res.status(err.status || 500).json({ live: false, error: err.message, attempts: err.attempts || [] });
  }
};
