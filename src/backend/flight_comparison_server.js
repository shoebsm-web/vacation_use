// Flight Comparison Server
// Calls multiple flight APIs and uses Claude AI to recommend best deals
// npm install express cors dotenv axios

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Your API Keys (from .env file)
const SERPAPI_KEY = process.env.SERPAPI_KEY; // Google Flights
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY; // Skyscanner, Kayak
const KIWI_API_KEY = process.env.KIWI_API_KEY; // Kiwi
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY; // Claude AI

// Function to get prices from Google Flights (via SerpAPI)
async function getGoogleFlightsPrices(fromAirport, toAirport, departDate) {
  try {
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google_flights',
        departure_id: fromAirport,
        arrival_id: toAirport,
        outbound_date: departDate,
        api_key: SERPAPI_KEY
      }
    });

    const flights = response.data.best_flights || [];
    return flights.slice(0, 3).map(flight => ({
      airline: flight.airlines?.[0] || 'Unknown',
      price: flight.price || 0,
      source: 'Google Flights',
      duration: flight.duration || 'N/A',
      stops: flight.stops || 0
    }));
  } catch (error) {
    console.log('Google Flights error:', error.message);
    return [];
  }
}

// Function to get prices from Skyscanner (via RapidAPI)
async function getSkyscannerPrices(fromAirport, toAirport, departDate) {
  try {
    const response = await axios.get('https://sky-scanner3.p.rapidapi.com/search/create', {
      params: {
        fromEntityId: fromAirport,
        toEntityId: toAirport,
        departDate: departDate
      },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'sky-scanner3.p.rapidapi.com'
      }
    });

    const results = response.data.data || [];
    return results.slice(0, 3).map(result => ({
      airline: result.legs?.[0]?.carriers?.[0]?.name || 'Unknown',
      price: result.price?.formatted || 0,
      source: 'Skyscanner',
      duration: result.legs?.[0]?.duration || 'N/A',
      stops: result.legs?.[0]?.stopCount || 0
    }));
  } catch (error) {
    console.log('Skyscanner error:', error.message);
    return [];
  }
}

// Function to get prices from Kiwi
async function getKiwiPrices(fromAirport, toAirport, departDate) {
  try {
    const response = await axios.get('https://tequila-api.kiwi.com/v2/search', {
      params: {
        fly_from: fromAirport,
        fly_to: toAirport,
        date_from: departDate,
        date_to: departDate,
        curr: 'USD',
        limit: 3
      },
      headers: {
        'apikey': KIWI_API_KEY
      }
    });

    return response.data.data?.slice(0, 3).map(flight => ({
      airline: flight.airlines?.[0] || 'Unknown',
      price: flight.price || 0,
      source: 'Kiwi',
      duration: flight.duration || 'N/A',
      stops: flight.stops || 0
    })) || [];
  } catch (error) {
    console.log('Kiwi error:', error.message);
    return [];
  }
}

// Function to simulate Kayak (since direct API is limited)
async function getKayakPrices(fromAirport, toAirport, departDate) {
  try {
    // Simulated Kayak data (in real production, would use actual API)
    return [
      {
        airline: 'Southwest',
        price: Math.floor(Math.random() * 100) + 200,
        source: 'Kayak',
        duration: '3h 20m',
        stops: 0
      }
    ];
  } catch (error) {
    console.log('Kayak error:', error.message);
    return [];
  }
}

// Function to analyze results with Claude AI
async function getAIRecommendation(flightResults) {
  try {
    // Sort by price to find cheapest
    const cheapest = [...flightResults].sort((a, b) => a.price - b.price)[0];
    
    const prompt = `You are a helpful travel advisor. Here are flight options found:

${flightResults.map(f => `- ${f.source}: $${f.price} (${f.airline}, ${f.duration}, ${f.stops} stops)`).join('\n')}

Cheapest option: ${cheapest.source} at $${cheapest.price}

Provide a SHORT recommendation (2-3 sentences) about which flight to book and why. Be concise.`;

    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: 'claude-opus-4-6',
      max_tokens: 200,
      messages: [
        { role: 'user', content: prompt }
      ]
    }, {
      headers: {
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      }
    });

    return response.data.content[0].text;
  } catch (error) {
    console.log('Claude error:', error.message);
    return `Book the cheapest option: ${flightResults[0]?.source} at $${flightResults[0]?.price}`;
  }
}

// Main API endpoint
app.post('/api/search-flights', async (req, res) => {
  try {
    const { fromAirport, toAirport, departDate } = req.body;

    if (!fromAirport || !toAirport || !departDate) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    console.log(`Searching flights: ${fromAirport} → ${toAirport} on ${departDate}`);

    // Call all APIs in parallel
    const [googleFlights, skyscanner, kiwi, kayak] = await Promise.all([
      getGoogleFlightsPrices(fromAirport, toAirport, departDate),
      getSkyscannerPrices(fromAirport, toAirport, departDate),
      getKiwiPrices(fromAirport, toAirport, departDate),
      getKayakPrices(fromAirport, toAirport, departDate)
    ]);

    // Combine all results
    const allFlights = [...googleFlights, ...skyscanner, ...kiwi, ...kayak];

    // Remove duplicates (same price + airline)
    const uniqueFlights = Array.from(
      new Map(allFlights.map(f => [`${f.airline}-${f.price}`, f])).values()
    );

    // Sort by price
    uniqueFlights.sort((a, b) => a.price - b.price);

    // Get AI recommendation
    const recommendation = await getAIRecommendation(uniqueFlights);

    res.json({
      success: true,
      flights: uniqueFlights,
      recommendation: recommendation,
      summary: {
        cheapest: uniqueFlights[0],
        average: Math.round(uniqueFlights.reduce((sum, f) => sum + f.price, 0) / uniqueFlights.length),
        total_options: uniqueFlights.length
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Flight comparison server running on http://localhost:${PORT}`);
  console.log(`API endpoint: POST ${PORT}/api/search-flights`);
});
