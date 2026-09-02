// BACKEND SERVER - Keeps your API key secret!
// This file is like a mailman between your website and Aviationstack

// Step 1: Load the .env file (where your secret key is stored)
require('dotenv').config();

// Step 2: Set up Express (a simple web server)
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000; // Your server will run on http://localhost:3000

// Step 3: Allow your website to talk to this server
app.use(cors());
app.use(express.json());

// Get the secret API key from .env file
const AVIATIONSTACK_KEY = process.env.AVIATIONSTACK_KEY;

if (!AVIATIONSTACK_KEY) {
  console.error('❌ ERROR: AVIATIONSTACK_KEY not found in .env file!');
  console.error('Please add: AVIATIONSTACK_KEY=your_key_here to your .env file');
  process.exit(1);
}

console.log('✅ API Key loaded successfully (hidden from browser)');

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
