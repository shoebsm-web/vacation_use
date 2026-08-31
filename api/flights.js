// Vercel Serverless Function - Deploy to Vercel automatically
// This handles all flight search requests with realistic mock data

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Mock holidays data
  const holidays = {
    2026: [
      { name: 'Labor Day', date: '2026-09-07', month: 'Sept', day: '7' },
      { name: 'Columbus Day', date: '2026-10-12', month: 'Oct', day: '12' },
      { name: 'Veterans Day', date: '2026-11-11', month: 'Nov', day: '11' },
      { name: 'Thanksgiving', date: '2026-11-26', month: 'Nov', day: '26' },
      { name: 'Christmas', date: '2026-12-25', month: 'Dec', day: '25' },
      { name: 'New Years', date: '2026-01-01', month: 'Jan', day: '1' },
      { name: 'MLK Day', date: '2026-01-19', month: 'Jan', day: '19' },
      { name: 'Presidents Day', date: '2026-02-16', month: 'Feb', day: '16' },
      { name: 'Memorial Day', date: '2026-05-25', month: 'May', day: '25' },
      { name: 'Independence Day', date: '2026-07-04', month: 'July', day: '4' }
    ],
    2027: [
      { name: 'Labor Day', date: '2027-09-06', month: 'Sept', day: '6' },
      { name: 'Columbus Day', date: '2027-10-11', month: 'Oct', day: '11' },
      { name: 'Veterans Day', date: '2027-11-11', month: 'Nov', day: '11' },
      { name: 'Thanksgiving', date: '2027-11-25', month: 'Nov', day: '25' },
      { name: 'Christmas', date: '2027-12-25', month: 'Dec', day: '25' },
      { name: 'New Years', date: '2027-01-01', month: 'Jan', day: '1' },
      { name: 'MLK Day', date: '2027-01-18', month: 'Jan', day: '18' },
      { name: 'Presidents Day', date: '2027-02-15', month: 'Feb', day: '15' },
      { name: 'Memorial Day', date: '2027-05-31', month: 'May', day: '31' },
      { name: 'Independence Day', date: '2027-07-04', month: 'July', day: '4' }
    ],
    2028: [
      { name: 'Labor Day', date: '2028-09-04', month: 'Sept', day: '4' },
      { name: 'Columbus Day', date: '2028-10-10', month: 'Oct', day: '10' },
      { name: 'Veterans Day', date: '2028-11-11', month: 'Nov', day: '11' },
      { name: 'Thanksgiving', date: '2028-11-23', month: 'Nov', day: '23' },
      { name: 'Christmas', date: '2028-12-25', month: 'Dec', day: '25' },
      { name: 'New Years', date: '2028-01-01', month: 'Jan', day: '1' },
      { name: 'MLK Day', date: '2028-01-17', month: 'Jan', day: '17' },
      { name: 'Presidents Day', date: '2028-02-21', month: 'Feb', day: '21' },
      { name: 'Memorial Day', date: '2028-05-29', month: 'May', day: '29' },
      { name: 'Independence Day', date: '2028-07-04', month: 'July', day: '4' }
    ]
  };

  // Mock flight data
  const mockFlights = {
    'MIA': [
      { airline: 'Southwest', price: 245, duration: '2h 30m', stops: 0, source: 'Google Flights' },
      { airline: 'United', price: 268, duration: '3h 15m', stops: 1, source: 'Skyscanner' },
      { airline: 'American', price: 255, duration: '2h 45m', stops: 0, source: 'Kayak' },
      { airline: 'Delta', price: 275, duration: '3h 00m', stops: 1, source: 'Kiwi' },
      { airline: 'Frontier', price: 189, duration: '4h 30m', stops: 1, source: 'Amadeus' }
    ],
    'LAX': [
      { airline: 'Southwest', price: 189, duration: '3h 45m', stops: 0, source: 'Google Flights' },
      { airline: 'United', price: 210, duration: '4h 00m', stops: 1, source: 'Skyscanner' },
      { airline: 'American', price: 198, duration: '3h 50m', stops: 0, source: 'Kayak' },
      { airline: 'Delta', price: 225, duration: '4h 15m', stops: 1, source: 'Kiwi' },
      { airline: 'Alaska', price: 175, duration: '4h 30m', stops: 1, source: 'Amadeus' }
    ],
    'CUN': [
      { airline: 'Southwest', price: 289, duration: '2h 45m', stops: 0, source: 'Google Flights' },
      { airline: 'United', price: 312, duration: '3h 30m', stops: 1, source: 'Skyscanner' },
      { airline: 'Cancun Air', price: 267, duration: '2h 30m', stops: 0, source: 'Kayak' },
      { airline: 'Delta', price: 335, duration: '4h 00m', stops: 2, source: 'Kiwi' },
      { airline: 'Frontier', price: 234, duration: '3h 45m', stops: 1, source: 'Amadeus' }
    ],
    'NYC': [
      { airline: 'Southwest', price: 145, duration: '2h 30m', stops: 0, source: 'Google Flights' },
      { airline: 'United', price: 168, duration: '3h 00m', stops: 1, source: 'Skyscanner' },
      { airline: 'American', price: 155, duration: '2h 45m', stops: 0, source: 'Kayak' },
      { airline: 'JetBlue', price: 139, duration: '2h 50m', stops: 0, source: 'Kiwi' },
      { airline: 'Budget Air', price: 125, duration: '3h 30m', stops: 1, source: 'Amadeus' }
    ],
    'CDG': [
      { airline: 'United', price: 489, duration: '7h 30m', stops: 0, source: 'Google Flights' },
      { airline: 'Air France', price: 512, duration: '7h 00m', stops: 0, source: 'Skyscanner' },
      { airline: 'Delta', price: 498, duration: '8h 30m', stops: 1, source: 'Kayak' },
      { airline: 'American', price: 525, duration: '9h 00m', stops: 1, source: 'Kiwi' },
      { airline: 'Lufthansa', price: 467, duration: '8h 00m', stops: 1, source: 'Amadeus' }
    ],
    'LHR': [
      { airline: 'British Airways', price: 445, duration: '7h 00m', stops: 0, source: 'Google Flights' },
      { airline: 'United', price: 468, duration: '7h 30m', stops: 0, source: 'Skyscanner' },
      { airline: 'Virgin Atlantic', price: 425, duration: '7h 15m', stops: 0, source: 'Kayak' },
      { airline: 'Delta', price: 489, duration: '8h 30m', stops: 1, source: 'Kiwi' },
      { airline: 'Norse', price: 289, duration: '7h 00m', stops: 0, source: 'Amadeus' }
    ],
    'BCN': [
      { airline: 'United', price: 445, duration: '8h 30m', stops: 1, source: 'Google Flights' },
      { airline: 'Iberia', price: 478, duration: '8h 00m', stops: 1, source: 'Skyscanner' },
      { airline: 'Delta', price: 456, duration: '9h 30m', stops: 2, source: 'Kayak' },
      { airline: 'Vueling', price: 389, duration: '8h 30m', stops: 1, source: 'Kiwi' },
      { airline: 'Lufthansa', price: 434, duration: '8h 00m', stops: 1, source: 'Amadeus' }
    ]
  };

  const path = req.url.split('?')[0];

  // GET /api/holidays - Return all holidays
  if (path === '/api/holidays' && req.method === 'GET') {
    return res.status(200).json({ holidays });
  }

  // GET /api/holidays/:year - Return holidays for specific year
  if (path.match(/^\/api\/holidays\/\d+$/) && req.method === 'GET') {
    const year = parseInt(path.split('/').pop());
    if (holidays[year]) {
      return res.status(200).json({ holidays: { [year]: holidays[year] } });
    }
    return res.status(404).json({ error: 'Year not found' });
  }

  // POST /api/search-flights
  if (path === '/api/search-flights' && req.method === 'POST') {
    const { toAirport } = req.body;
    
    // Get flights for destination
    let flights = mockFlights[toAirport] || mockFlights['MIA'];
    
    // Slightly randomize prices for variety
    flights = flights.map(f => ({
      ...f,
      price: f.price + Math.floor(Math.random() * 50 - 25)
    })).sort((a, b) => a.price - b.price);

    const avg = Math.round(flights.reduce((sum, f) => sum + f.price, 0) / flights.length);

    return res.status(200).json({
      success: true,
      flights,
      summary: { average: avg, count: flights.length },
      recommendation: "This is a great collection of flights! " + 
        (flights[0] ? `The cheapest option is ${flights[0].airline} at $${flights[0].price}, which is an excellent deal. ` : "") +
        "I recommend booking in advance to lock in these prices."
    });
  }

  // POST /api/compare-dates
  if (path === '/api/compare-dates' && req.method === 'POST') {
    const { dates, toAirport } = req.body;
    
    let baseFlights = mockFlights[toAirport] || mockFlights['MIA'];
    const comparisons = dates.map((date, idx) => {
      const priceVariation = Math.floor(Math.random() * 100 - 50);
      const cheapest = baseFlights[0];
      return {
        date,
        cheapest: { 
          price: cheapest.price + priceVariation,
          airline: cheapest.airline 
        },
        average: Math.round(baseFlights.reduce((sum, f) => sum + f.price, 0) / baseFlights.length) + priceVariation
      };
    });

    return res.status(200).json({ comparisons });
  }

  // POST /api/price-trends
  if (path === '/api/price-trends' && req.method === 'POST') {
    const { years } = req.body;
    
    const trends = years.map(year => ({
      year,
      cheapest: 189 + Math.floor(Math.random() * 100)
    }));

    return res.status(200).json({ trends });
  }

  return res.status(404).json({ error: 'Endpoint not found' });
}
