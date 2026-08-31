// Enhanced Flight Comparison Server
// Multi-year vacation planning with advanced features
// npm install express cors dotenv axios

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// API Keys
const SERPAPI_KEY = process.env.SERPAPI_KEY;
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const KIWI_API_KEY = process.env.KIWI_API_KEY;
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

// ==================== HOLIDAY DATABASE ====================
// Multi-year US federal holidays
const HOLIDAYS_DATABASE = {
  2026: [
    { name: 'New Year\'s Day', date: '2026-01-01', month: 'January', day: 1 },
    { name: 'MLK Jr. Day', date: '2026-01-19', month: 'January', day: 19 },
    { name: 'Presidents Day', date: '2026-02-16', month: 'February', day: 16 },
    { name: 'Memorial Day', date: '2026-05-25', month: 'May', day: 25 },
    { name: 'Independence Day', date: '2026-07-04', month: 'July', day: 4 },
    { name: 'Labor Day', date: '2026-09-07', month: 'September', day: 7 },
    { name: 'Columbus Day', date: '2026-10-12', month: 'October', day: 12 },
    { name: 'Veterans Day', date: '2026-11-11', month: 'November', day: 11 },
    { name: 'Thanksgiving', date: '2026-11-26', month: 'November', day: 26 },
    { name: 'Christmas', date: '2026-12-25', month: 'December', day: 25 }
  ],
  2027: [
    { name: 'New Year\'s Day', date: '2027-01-01', month: 'January', day: 1 },
    { name: 'MLK Jr. Day', date: '2027-01-18', month: 'January', day: 18 },
    { name: 'Presidents Day', date: '2027-02-15', month: 'February', day: 15 },
    { name: 'Memorial Day', date: '2027-05-31', month: 'May', day: 31 },
    { name: 'Independence Day', date: '2027-07-04', month: 'July', day: 4 },
    { name: 'Labor Day', date: '2027-09-06', month: 'September', day: 6 },
    { name: 'Columbus Day', date: '2027-10-11', month: 'October', day: 11 },
    { name: 'Veterans Day', date: '2027-11-11', month: 'November', day: 11 },
    { name: 'Thanksgiving', date: '2027-11-25', month: 'November', day: 25 },
    { name: 'Christmas', date: '2027-12-25', month: 'December', day: 25 }
  ],
  2028: [
    { name: 'New Year\'s Day', date: '2028-01-01', month: 'January', day: 1 },
    { name: 'MLK Jr. Day', date: '2028-01-17', month: 'January', day: 17 },
    { name: 'Presidents Day', date: '2028-02-21', month: 'February', day: 21 },
    { name: 'Memorial Day', date: '2028-05-29', month: 'May', day: 29 },
    { name: 'Independence Day', date: '2028-07-04', month: 'July', day: 4 },
    { name: 'Labor Day', date: '2028-09-04', month: 'September', day: 4 },
    { name: 'Columbus Day', date: '2028-10-09', month: 'October', day: 9 },
    { name: 'Veterans Day', date: '2028-11-11', month: 'November', day: 11 },
    { name: 'Thanksgiving', date: '2028-11-23', month: 'November', day: 23 },
    { name: 'Christmas', date: '2028-12-25', month: 'December', day: 25 }
  ]
};

// ==================== DESTINATION DATABASE ====================
const DESTINATIONS = [
  // Domestic
  { code: 'MIA', name: 'Miami, FL', type: 'domestic', climate: 'warm' },
  { code: 'LAX', name: 'Los Angeles, CA', type: 'domestic', climate: 'warm' },
  { code: 'NYC', name: 'New York, NY', type: 'domestic', climate: 'cold' },
  { code: 'LAS', name: 'Las Vegas, NV', type: 'domestic', climate: 'warm' },
  { code: 'ORD', name: 'Chicago, IL', type: 'domestic', climate: 'cold' },
  { code: 'DEN', name: 'Denver, CO', type: 'domestic', climate: 'cold' },
  { code: 'SFO', name: 'San Francisco, CA', type: 'domestic', climate: 'cool' },
  { code: 'SEA', name: 'Seattle, WA', type: 'domestic', climate: 'cool' },
  { code: 'BOS', name: 'Boston, MA', type: 'domestic', climate: 'cold' },
  { code: 'ATL', name: 'Atlanta, GA', type: 'domestic', climate: 'warm' },
  
  // Caribbean
  { code: 'CUN', name: 'Cancun, Mexico', type: 'caribbean', climate: 'warm' },
  { code: 'SJU', name: 'San Juan, Puerto Rico', type: 'caribbean', climate: 'warm' },
  { code: 'NAS', name: 'Nassau, Bahamas', type: 'caribbean', climate: 'warm' },
  { code: 'MBJ', name: 'Montego Bay, Jamaica', type: 'caribbean', climate: 'warm' },
  { code: 'STT', name: 'St. Thomas, USVI', type: 'caribbean', climate: 'warm' },
  
  // International
  { code: 'CDG', name: 'Paris, France', type: 'international', climate: 'cool' },
  { code: 'LHR', name: 'London, UK', type: 'international', climate: 'cold' },
  { code: 'AMS', name: 'Amsterdam, Netherlands', type: 'international', climate: 'cool' },
  { code: 'BCN', name: 'Barcelona, Spain', type: 'international', climate: 'warm' },
  { code: 'DUB', name: 'Dublin, Ireland', type: 'international', climate: 'cool' }
];

// ==================== FLIGHT API FUNCTIONS ====================

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
      stops: flight.stops || 0,
      departure_time: flight.departure_time || 'N/A'
    }));
  } catch (error) {
    console.log('Google Flights error:', error.message);
    return [];
  }
}

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
      price: parseFloat(result.price?.formatted || 0),
      source: 'Skyscanner',
      duration: result.legs?.[0]?.duration || 'N/A',
      stops: result.legs?.[0]?.stopCount || 0,
      departure_time: result.legs?.[0]?.departure || 'N/A'
    }));
  } catch (error) {
    console.log('Skyscanner error:', error.message);
    return [];
  }
}

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
      stops: flight.stops || 0,
      departure_time: flight.local_departure || 'N/A'
    })) || [];
  } catch (error) {
    console.log('Kiwi error:', error.message);
    return [];
  }
}

async function getKayakPrices(fromAirport, toAirport, departDate) {
  try {
    // Simulated Kayak data
    return [
      {
        airline: 'Southwest',
        price: Math.floor(Math.random() * 100) + 200,
        source: 'Kayak',
        duration: '3h 20m',
        stops: 0,
        departure_time: '09:00'
      }
    ];
  } catch (error) {
    console.log('Kayak error:', error.message);
    return [];
  }
}

// ==================== AI RECOMMENDATION FUNCTION ====================

async function getAIRecommendation(flightResults) {
  try {
    const cheapest = [...flightResults].sort((a, b) => a.price - b.price)[0];
    
    const prompt = `You are a helpful travel advisor. Analyze these flight options and provide a SHORT recommendation (2-3 sentences):

${flightResults.map(f => `- ${f.source}: $${f.price} (${f.airline}, ${f.duration}, ${f.stops} stops)`).join('\n')}

Cheapest: ${cheapest.source} at $${cheapest.price}

Recommend which to book and briefly explain why.`;

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

// ==================== API ENDPOINTS ====================

// Get all holidays for all years
app.get('/api/holidays', (req, res) => {
  try {
    res.json({
      success: true,
      holidays: HOLIDAYS_DATABASE,
      years: Object.keys(HOLIDAYS_DATABASE).map(Number).sort()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get holidays for specific year
app.get('/api/holidays/:year', (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const holidays = HOLIDAYS_DATABASE[year];
    
    if (!holidays) {
      return res.status(404).json({ error: 'Year not found' });
    }

    res.json({
      success: true,
      year: year,
      holidays: holidays,
      count: holidays.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all destinations
app.get('/api/destinations', (req, res) => {
  try {
    res.json({
      success: true,
      destinations: DESTINATIONS,
      count: DESTINATIONS.length,
      types: [...new Set(DESTINATIONS.map(d => d.type))]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search flights (multi-year enhanced)
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

    // Remove duplicates
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
        total_options: uniqueFlights.length,
        savings: uniqueFlights[0] ? Math.round(uniqueFlights[uniqueFlights.length - 1].price - uniqueFlights[0].price) : 0
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Compare prices across multiple dates
app.post('/api/compare-dates', async (req, res) => {
  try {
    const { fromAirport, toAirport, dates } = req.body;

    if (!fromAirport || !toAirport || !Array.isArray(dates) || dates.length === 0) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    console.log(`Comparing prices for ${dates.length} dates`);

    const comparisons = await Promise.all(
      dates.map(async (date) => {
        const [googleFlights, skyscanner, kiwi, kayak] = await Promise.all([
          getGoogleFlightsPrices(fromAirport, toAirport, date),
          getSkyscannerPrices(fromAirport, toAirport, date),
          getKiwiPrices(fromAirport, toAirport, date),
          getKayakPrices(fromAirport, toAirport, date)
        ]);

        const allFlights = [...googleFlights, ...skyscanner, ...kiwi, ...kayak];
        const uniqueFlights = Array.from(
          new Map(allFlights.map(f => [`${f.airline}-${f.price}`, f])).values()
        );
        
        uniqueFlights.sort((a, b) => a.price - b.price);

        return {
          date: date,
          cheapest: uniqueFlights[0],
          average: Math.round(uniqueFlights.reduce((sum, f) => sum + f.price, 0) / (uniqueFlights.length || 1)),
          options: uniqueFlights.length
        };
      })
    );

    // Sort by cheapest price
    comparisons.sort((a, b) => a.cheapest.price - b.cheapest.price);

    res.json({
      success: true,
      comparisons: comparisons,
      best_date: comparisons[0],
      worst_date: comparisons[comparisons.length - 1]
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get price trends for a route
app.post('/api/price-trends', async (req, res) => {
  try {
    const { fromAirport, toAirport, holiday, years } = req.body;

    if (!fromAirport || !toAirport || !holiday || !Array.isArray(years)) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const trends = [];

    for (const year of years) {
      const holidays = HOLIDAYS_DATABASE[year];
      if (!holidays) continue;

      const holidayData = holidays.find(h => h.name === holiday);
      if (!holidayData) continue;

      const [googleFlights, skyscanner, kiwi] = await Promise.all([
        getGoogleFlightsPrices(fromAirport, toAirport, holidayData.date),
        getSkyscannerPrices(fromAirport, toAirport, holidayData.date),
        getKiwiPrices(fromAirport, toAirport, holidayData.date)
      ]);

      const allFlights = [...googleFlights, ...skyscanner, ...kiwi];
      const uniqueFlights = Array.from(
        new Map(allFlights.map(f => [`${f.airline}-${f.price}`, f])).values()
      );

      uniqueFlights.sort((a, b) => a.price - b.price);

      trends.push({
        year: year,
        date: holidayData.date,
        cheapest: uniqueFlights[0]?.price || 0,
        average: Math.round(uniqueFlights.reduce((sum, f) => sum + f.price, 0) / (uniqueFlights.length || 1))
      });
    }

    res.json({
      success: true,
      holiday: holiday,
      trends: trends,
      cheapest_year: trends.reduce((min, t) => t.cheapest < min.cheapest ? t : min, trends[0])
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!', features: ['multi-year support', 'price comparison', 'AI recommendations'] });
});

// ==================== SERVER START ====================

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Enhanced flight comparison server running on http://localhost:${PORT}`);
  console.log(`📅 Supports: 2026, 2027, 2028`);
  console.log(`✨ Features: Multi-year planning, price trends, date comparison`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET  /api/holidays - All holidays for all years`);
  console.log(`  GET  /api/holidays/:year - Holidays for specific year`);
  console.log(`  GET  /api/destinations - All vacation destinations`);
  console.log(`  POST /api/search-flights - Search flights for a date`);
  console.log(`  POST /api/compare-dates - Compare prices across multiple dates`);
  console.log(`  POST /api/price-trends - See price trends across years`);
});
