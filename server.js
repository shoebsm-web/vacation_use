// BACKEND SERVER - Keeps your API key secret!
// This file is like a mailman between your website and Aviationstack

// Step 1: Load the .env file (where your secret key is stored)
require('dotenv').config();

// Step 2: Set up Express (a simple web server)
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000; // Your server will run on http://localhost:3000
const { searchLiveFlights, providerStatus, getQuota } = require('./lib/liveFlights');

// Step 3: Allow your website to talk to this server
app.use(cors());
app.use(express.json());

// Get the secret API key from .env file
const AVIATIONSTACK_KEY = process.env.AVIATIONSTACK_KEY;

if (!AVIATIONSTACK_KEY) {
  console.warn('⚠️  AVIATIONSTACK_KEY not set - schedule endpoints disabled (live prices still work)');
}
console.log('✈️  Live price providers:', providerStatus().map(p => `${p.name}=${p.configured ? 'ON' : 'off'}`).join(', '));

// ============================================
// LIVE PRICES: real Google Flights prices, every search
// GET /api/live-flights?from=DFW&to=CUN&depart=2026-11-26&return=2026-12-03
// ============================================
app.get('/api/live-flights', async (req, res) => {
  res.set('Cache-Control', 'no-store');
  if (req.query.status) return res.json({ ok: true, providers: providerStatus() });
  if (req.query.quota) {
    try { return res.json(await getQuota()); }
    catch (err) { return res.status(502).json({ error: err.message.replace(process.env.SERPAPI_KEY || '~', '***') }); }
  }
  try {
    const { from, to, depart } = req.query;
    console.log(`📡 LIVE search ${from} → ${to} ${depart} / ${req.query.return || 'one-way'}`);
    const data = await searchLiveFlights({ from, to, depart, ret: req.query.return });
    console.log(`✅ ${data.count} live flights from ${data.provider}`);
    res.json(data);
  } catch (err) {
    console.error('❌ Live search failed:', err.message);
    res.status(err.status || 500).json({ live: false, error: err.message, attempts: err.attempts || [] });
  }
});

// Serve the dashboard from this server too (http://localhost:3000/skypulse-standalone.html)
app.get(['/', '/skypulse-standalone.html'], (req, res) => res.sendFile(__dirname + '/skypulse-standalone.html'));

// ============================================
// ENDPOINT 1: Search flights by airline code
// ============================================
app.get('/api/flights/:airline/:flightNumber', async (req, res) => {
  try {
    const { airline, flightNumber } = req.params;
    
    // Call Aviationstack API (your key stays secret here!)
    const url = `http://api.aviationstack.com/v1/flights?access_key=${AVIATIONSTACK_KEY}&flight_iata=${airline}${flightNumber}`;
    
    console.log(`📡 Calling Aviationstack for flight: ${airline}${flightNumber}`);
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ Got real flight data!`);
      res.json(data); // Send real data back to website
    } else {
      console.error(`❌ Aviationstack error:`, data);
      res.status(response.status).json({ error: data });
    }
  } catch (error) {
    console.error('❌ Server error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ENDPOINT 2: Search flights by route
// ============================================
app.post('/api/search-flights', async (req, res) => {
  try {
    const { departure, arrival, date } = req.body;
    
    // Call Aviationstack API
    const url = `http://api.aviationstack.com/v1/flights?access_key=${AVIATIONSTACK_KEY}&dep_iata=${departure}&arr_iata=${arrival}&flight_date=${date}`;
    
    console.log(`📡 Searching flights from ${departure} to ${arrival} on ${date}`);
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ Found ${data.data?.length || 0} flights`);
      res.json(data);
    } else {
      console.error(`❌ Aviationstack error:`, data);
      res.status(response.status).json({ error: data });
    }
  } catch (error) {
    console.error('❌ Server error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ENDPOINT 3: Get airport data
// ============================================
app.get('/api/airports/:iataCode', async (req, res) => {
  try {
    const { iataCode } = req.params;
    
    const url = `http://api.aviationstack.com/v1/airports?access_key=${AVIATIONSTACK_KEY}&iata_code=${iataCode}`;
    
    console.log(`📡 Getting airport info for: ${iataCode}`);
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ Got airport data`);
      res.json(data);
    } else {
      console.error(`❌ Aviationstack error:`, data);
      res.status(response.status).json({ error: data });
    }
  } catch (error) {
    console.error('❌ Server error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ENDPOINT 4: Health check (is server running?)
// ============================================
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running! ✅',
    time: new Date().toISOString()
  });
});

// ============================================
// Start the server
// ============================================
app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════╗');
  console.log('║   🚀 BACKEND SERVER STARTED! 🚀        ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');
  console.log(`✅ Server running at: http://localhost:${PORT}`);
  console.log(`✅ API key: HIDDEN (secret and safe) 🔒`);
  console.log('');
  console.log('📍 Available endpoints:');
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   GET  http://localhost:${PORT}/api/live-flights?from=DFW&to=CUN&depart=YYYY-MM-DD&return=YYYY-MM-DD`);
  console.log(`   GET  http://localhost:${PORT}/api/flights/:airline/:flightNumber`);
  console.log(`   POST http://localhost:${PORT}/api/search-flights`);
  console.log(`   GET  http://localhost:${PORT}/api/airports/:iataCode`);
  console.log('');
  console.log('Press Ctrl+C to stop the server');
  console.log('');
});

// Handle errors
process.on('uncaughtException', (error) => {
  console.error('❌ Unexpected error:', error);
});
