# 🌍 Vacation Planner 2026 - Interactive Holiday Dashboard

A smart, modern web application for planning vacations around bank holidays with real-time flight pricing, destination recommendations, and an interactive dashboard.

## ✨ Features

- 🏖️ **5 Bank Holidays** - Pre-calculated vacation periods for 2026
- 🛫 **Flight Price Estimation** - Real-time pricing for economy, premium, business, and first class
- 🗺️ **20 Destinations** - Curated list of domestic and international locations
- 📊 **Smart Recommendations** - Destinations filtered by trip duration and season
- 💰 **Price Comparison** - See full price ranges and hotel costs
- 🎨 **Beautiful Dashboard** - Modern, responsive UI with real-time calculations
- ⚡ **Fast & Lightweight** - Pure JavaScript, no external API dependencies (backend only)

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/vacation-planner-2026.git
cd vacation-planner-2026

# Install dependencies
npm install

# Run the backend demo
npm test

# Or start the backend server
npm start
```

## 📁 Project Structure

```
vacation-planner-2026/
├── src/
│   ├── backend/
│   │   ├── vacation_backend.js      # Core backend engine
│   │   └── vacation_api_demo.js     # API examples & tests
│   └── frontend/
│       ├── dashboard.html           # Main dashboard UI
│       └── styles.css              # Dashboard styles
├── docs/
│   ├── BACKEND_ARCHITECTURE.md     # Backend design docs
│   ├── API_REFERENCE.md            # API documentation
│   └── DASHBOARD_GUIDE.md          # Frontend usage guide
├── package.json                     # Node.js dependencies
├── .gitignore                      # Git ignore rules
└── README.md                       # This file
```

## 🎯 How It Works

### Backend Workflow

```
1. User selects holiday → calculateVacationPeriod()
2. System calculates dates → getDestinationsByTrip()
3. Destinations filtered by season → calculateFlightPrice()
4. All options compiled → generateTripRecommendations()
5. Frontend displays results
```

### Example Usage

```javascript
const backend = require('./src/backend/vacation_backend');

// Get Thanksgiving recommendations (3 vacation days)
const recommendations = backend.generateTripRecommendations('thanksgiving', 3, 10);

// Returns:
// {
//   vacationPeriod: { startDate, endDate, totalDaysOff },
//   flightOptions: [
//     { economy, premiumEconomy, destination },
//     ...
//   ],
//   summary: { totalDaysOff, tripDates, averageFlightCost }
// }
```

## 📊 Available Holidays

| Holiday | Date | Day | Min Days | Max Days | Best For |
|---------|------|-----|----------|----------|----------|
| Labor Day | Sept 7 | Mon | 1 | 4 | Short domestic trips |
| Columbus Day | Oct 12 | Mon | 1 | 4 | Fall getaways |
| Veterans Day | Nov 11 | Wed | 3 | 5 | Mid-week trips |
| Thanksgiving | Nov 26 | Thu | 2 | 6 | Family gatherings |
| Christmas | Dec 25 | Fri | 4 | 12 | Extended holidays |

## 🌎 Destinations

### Domestic (10)
NYC, Miami, Los Angeles, Chicago, Denver, New Orleans, San Francisco, Boston, Key West, Las Vegas

### International (10)
Cancún (Mexico), Los Cabos (Mexico), San José (Costa Rica), Belize, Caribbean Islands, Tokyo (Japan), Rome (Italy), Paris (France), Barcelona (Spain), London (UK)

## 💻 API Reference

### Core Functions

#### `generateTripRecommendations(holidayId, vacationDaysAdded, numDestinations)`
Master function for complete trip planning.

**Parameters:**
- `holidayId` (string): 'labor-day', 'columbus-day', 'veterans-day', 'thanksgiving', 'christmas'
- `vacationDaysAdded` (number): 0-6 days of vacation to add
- `numDestinations` (number): How many recommendations to return (default: 8)

**Returns:**
```javascript
{
  vacationPeriod: { startDate, endDate, totalDaysOff, dayRange },
  numDestinations: 10,
  flightOptions: [
    {
      economy: { estimatedPrice, priceRange, airlines },
      premiumEconomy: { estimatedPrice, priceRange },
      destination: { name, region, country, type, hotelRange, bestFor }
    },
    ...
  ],
  summary: { totalDaysOff, tripDates, availableDestinations, averageFlightCost }
}
```

#### `calculateVacationPeriod(holidayId, vacationDaysAdded)`
Calculate exact vacation dates.

#### `calculateFlightPrice(destinationId, vacationPeriod, flightClass)`
Get flight pricing for specific destination and class.

#### `getDestinationsByTrip(vacationPeriod)`
Get destination recommendations for trip duration.

See [API_REFERENCE.md](docs/API_REFERENCE.md) for complete API documentation.

## 🎨 Dashboard Features

The interactive dashboard includes:

- **Holiday Selector** - Choose from 5 bank holidays
- **Vacation Days Slider** - Adjust days (0-6 range)
- **Real-time Calculations** - Instant date and price updates
- **Destination Cards** - Flight prices, hotel ranges, climate info
- **Sorting & Filtering** - By price, region, type, climate
- **Price Breakdown** - Economy, premium economy comparison
- **Trip Summary** - Total cost, dates, duration

## 📈 Price Calculation

Flight prices are calculated based on:

1. **Base Destination Price** - Historical average for that location
2. **Trip Duration** - Longer trips get discounts, short trips premium pricing
3. **Flight Class** - Economy (1x), Premium (1.35x), Business (2.5x), First (4x)
4. **Realism Factor** - ±15% variance to simulate real-world pricing

Example: Miami for 4-day trip = $220 base → $264 adjusted → $224-$304 range

## 🔧 Development

### Adding a New Holiday

```javascript
// In vacation_backend.js, add to HOLIDAYS_2026:
{
  id: 'new-holiday',
  name: 'New Holiday Name',
  date: '2026-MM-DD',
  dayOfWeek: 'Monday',
  minVacationDays: 1,
  defaultVacationDays: 2,
  suggestedDays: [1, 2, 3],
  totalDaysAvailable: 5,
  description: 'Holiday description'
}
```

### Adding a New Destination

```javascript
// In vacation_backend.js, add to DESTINATIONS:
{
  id: 'destination-id',
  name: 'Destination Name',
  region: 'Region',
  country: 'Country',
  airports: ['AIRPORT_CODE'],
  avgFlightCost: 300,
  type: 'Type (Beach/City/Mountain)',
  bestFor: ['tag1', 'tag2'],
  climate: ['warm', 'tropical'],
  hotelRange: '$100-$300/night'
}
```

## 🧪 Testing

Run the backend API tests:

```bash
npm test
```

This runs `vacation_api_demo.js` which demonstrates:
- Holiday data retrieval
- Vacation period calculations
- Flight price estimation
- Full trip recommendations

## 📚 Documentation

- [Backend Architecture](docs/BACKEND_ARCHITECTURE.md) - System design and data flow
- [API Reference](docs/API_REFERENCE.md) - Detailed API documentation
- [Dashboard Guide](docs/DASHBOARD_GUIDE.md) - Frontend usage and customization

## 🚀 Future Enhancements

- [ ] Real-time flight data integration (Skyscanner, Google Flights)
- [ ] Hotel booking integration
- [ ] Weather forecasts for trip dates
- [ ] User authentication & saved trips
- [ ] Email notifications for price drops
- [ ] Mobile app version
- [ ] Visa requirement checker
- [ ] Activity recommendations per destination
- [ ] Dynamic pricing based on demand
- [ ] Multi-city trip planning

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For questions or suggestions, open an issue on GitHub.

---

**Made with ❤️ for travelers who love planning**

Last updated: August 31, 2026
