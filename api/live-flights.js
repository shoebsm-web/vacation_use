// Vercel serverless function: LIVE flight prices
// GET /api/live-flights?from=DFW&to=CUN&depart=2026-11-26&return=2026-12-03
// GET /api/live-flights?status=1   -> which providers have keys set
// Keys come from Vercel env vars: SEARCHAPI_KEY, SERPAPI_KEY
const { searchLiveFlights, providerStatus, getQuota, exploreDestinations } = require('../lib/liveFlights');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store'); // always live, never cached
  if (req.method === 'OPTIONS') return res.status(200).end();

  const q = req.query || {};
  if (q.status) return res.status(200).json({ ok: true, providers: providerStatus() });
  if (q.explore) {
    try { return res.status(200).json(await exploreDestinations({ from: q.from, depart: q.depart, ret: q.return, interest: q.interest, stops: q.stops })); }
    catch (err) { return res.status(err.status || 500).json({ live: false, error: err.message }); }
  }
  if (q.quota) {
    try { return res.status(200).json(await getQuota()); }
    catch (err) { return res.status(502).json({ error: err.message.replace(process.env.SERPAPI_KEY || '~', '***') }); }
  }

  try {
    const data = await searchLiveFlights({ from: q.from, to: q.to, depart: q.depart, ret: q.return });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(err.status || 500).json({ live: false, error: err.message, attempts: err.attempts || [] });
  }
};
