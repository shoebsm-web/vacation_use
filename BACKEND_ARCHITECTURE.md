# Vacation Planning Backend - Architecture Documentation

## Overview

The vacation planning backend is a pure data and calculation engine that manages:
- Holiday dates and vacation day calculations
- Destination database with 20 curated locations
- Flight price estimation based on trip parameters
- Smart destination recommendations based on trip duration and season

## Core Components

### 1. Holiday Database (HOLIDAYS_2026)

**Data Structure:**
```javascript
{
  id: 'labor-day',                    // Unique identifier
  name: 'Labor Day',                  // Display name
  date: '2026-09-07',                 // ISO date format
  dayOfWeek: 'Monday',                // Day of week
  minVacationDays: 1,                 // Minimum days to request
  defaultVacationDays: 1,             // Suggested default
  suggestedDays: [1, 3],              // Recommended vacation day options
  totalDaysAvailable: 4,              // Max possible days off
  description: 'Summer holiday'       // Holiday context
}
```

**Available Holidays:**
- Labor Day (Sept 7) - Monday - 4 days max
- Columbus Day (Oct 12) - Monday - 4 days max
- Veterans Day (Nov 11) - Wednesday - 5 days max
- Thanksgiving (Nov 26) - Thursday - 6 days max
- Christmas (Dec 25) - Friday - 12 days max

### 2. Destination Database (DESTINATIONS)

**Data Structure:**
```javascript
{
  id: 'miami',                                    // Unique ID
  name: 'Miami',                                  // Display name
  region: 'Southeast',                            // Geographic region
  country: 'USA',                                 // Country
  airports: ['MIA', 'FLL'],                      // Airport codes
  avgFlightCost: 220,                            // Base flight cost
  type: 'Beach',                                  // Destination type
  bestFor: ['warm-weather', 'relaxation'],       // Keywords
  climate: ['warm', 'tropical'],                 // Climate tags
  hotelRange: '$120-$350/night'                  // Hotel cost range
}
```

**20 Destinations Included:**
- **Domestic:** NYC, Miami, LA, Chicago, Denver, New Orleans, San Francisco, Boston, Key West, Vegas
- **International:** Cancún, Los Cabos, Costa Rica, Belize, Caribbean Islands, Japan, Italy, France, Spain, UK

### 3. Core API Functions

#### `calculateVacationPeriod(holidayId, vacationDaysAdded)`
Calculates the start/end dates and total days off for a trip.

**Parameters:**
- `holidayId` (string): 'labor-day', 'thanksgiving', etc.
- `vacationDaysAdded` (number): 0-6 days of vacation to request before the holiday

**Returns:**
```javascript
{
  holidayId: 'thanksgiving',
  holidayName: 'Thanksgiving',
  vacationDaysAdded: 3,
  startDate: '2026-11-23',
  endDate: '2026-11-26',
  totalDaysOff: 4,
  dayRange: '2026-11-23 to 2026-11-26',
  numberOfNights: 3
}
```

**Logic:**
- 0 days added: Just the holiday (1 day)
- 1 day added: Holiday + 1 day before (2 days)
- 2 days added: Holiday + 2 days before (3 days)
- 3 days added: Holiday + 3 days before (4 days)
- 4+ days added: Extends weekend (10+ days possible)

#### `getDestinationsByTrip(vacationPeriod)`
Recommends destinations based on trip length and season.

**Smart Filtering:**
- **Short trips (≤4 days):** Domestic + nearby Caribbean
- **Medium trips (5-6 days):** Domestic + Mexico + Central America
- **Long trips (7+ days):** All destinations viable

**Seasonal Logic:**
- **Fall/Winter holidays:** Warm destinations ranked first
- **Summer holidays:** All climates considered

**Returns:**
Sorted array of destination objects matching trip criteria

#### `calculateFlightPrice(destinationId, vacationPeriod, flightClass)`
Estimates flight price based on destination and trip parameters.

**Parameters:**
- `destinationId` (string): 'miami', 'france', etc.
- `vacationPeriod` (object): Result from calculateVacationPeriod()
- `flightClass` (string): 'economy' (1x), 'premium-economy' (1.35x), 'business' (2.5x), 'first' (4x)

**Price Calculation:**
1. Start with destination base price
2. Adjust for trip length:
   - Short trips (≤3 days): +20% premium
   - Long trips (≥10 days): -10% discount
3. Apply class multiplier
4. Add ±15% variance for realism
5. Return price range and estimated price

**Returns:**
```javascript
{
  destinationId: 'miami',
  destinationName: 'Miami',
  basePrice: 220,
  pricePerDay: 55,
  flightClass: 'economy',
  estimatedPrice: 264,
  priceRange: { min: 224, max: 304 },
  departureDate: '2026-09-06',
  returnDate: '2026-09-07',
  tripDuration: 2,
  airlines: ['American', 'United', 'Delta', 'Southwest']
}
```

#### `generateTripRecommendations(holidayId, vacationDaysAdded, numDestinations)`
Master function combining all calculations for complete trip planning.

**Parameters:**
- `holidayId` (string): Holiday identifier
- `vacationDaysAdded` (number): Vacation days to add
- `numDestinations` (number): How many destination recommendations (default 8, max recommended)

**Returns Comprehensive Object:**
```javascript
{
  vacationPeriod: { /* full vacation period data */ },
  numDestinations: 10,
  flightOptions: [
    {
      economy: { /* economy flight pricing */ },
      premiumEconomy: { /* premium pricing */ },
      destination: { /* destination details */ }
    },
    // ... more destinations
  ],
  summary: {
    totalDaysOff: 4,
    tripDates: '2026-11-23 to 2026-11-26',
    availableDestinations: 10,
    averageFlightCost: 239
  }
}
```

## Data Flow Architecture

```
Frontend Request
    ↓
[Holiday Selection] + [Vacation Days Added]
    ↓
calculateVacationPeriod()
    ↓ Returns: Start date, end date, total days
    ↓
getDestinationsByTrip()
    ↓ Returns: Filtered & sorted destinations
    ↓
calculateFlightPrice() (for each destination)
    ↓ Returns: Price, range, airlines
    ↓
generateTripRecommendations()
    ↓ Returns: Complete recommendation object
    ↓
Frontend Renders Results
```

## Key Features

### 1. Smart Date Calculations
- Automatically calculates weekends
- Considers Monday holidays for 4-day weekends
- Supports extended vacation periods
- Returns both individual dates and date ranges

### 2. Intelligent Destination Filtering
- Recommends destinations based on trip length
- Considers seasonal climate preferences
- Prioritizes warm climates for winter holidays
- Filters out inappropriate options for short trips

### 3. Realistic Flight Pricing
- Base prices from real industry data
- Adjustments for trip duration
- Multiple cabin classes supported
- Realistic price variance (±15%)
- Airlines listed for each option

### 4. Scalable Design
- Easy to add new holidays
- Easy to add new destinations
- All calculations are algorithmic (no hardcoding)
- Price adjustments are configurable

## Future Enhancement Points

### Real Flight Data Integration
```javascript
// Future: Replace static pricing with:
- Real API calls to Skyscanner/Google Flights
- Live pricing for exact dates
- Actual airline schedules
- Real baggage policies
```

### Hotel Integration
```javascript
// Future: Add hotel data layer:
- Hotel pricing for each destination
- Hotel ratings and reviews
- All-inclusive resorts
- Travel packages (flight + hotel)
```

### User Preferences
```javascript
// Future: Personalization:
- Saved preferences (climates, distances, budgets)
- Saved trips and comparisons
- Budget constraints
- Flight time preferences
```

### Additional Features
```javascript
// Future additions:
- Visa requirements by destination
- Weather forecasts for trip dates
- Crowd/tourism levels
- Activity recommendations
- Restaurant/attraction suggestions
```

## Usage Examples

### Example 1: Simple Thanksgiving Trip
```javascript
const recommendations = backend.generateTripRecommendations('thanksgiving', 3, 10);
// Returns: 4 days off (Nov 23-26), 10 warm destination options
```

### Example 2: Extended Christmas Holiday
```javascript
const recommendations = backend.generateTripRecommendations('christmas', 5, 15);
// Returns: 7 days off, all 20 destinations viable
```

### Example 3: Get Flight Price for Specific Destination
```javascript
const period = backend.calculateVacationPeriod('labor-day', 1);
const price = backend.calculateFlightPrice('miami', period, 'economy');
// Returns: $264 estimated, $224-304 range
```

## Performance Characteristics

- **All calculations:** O(n) where n = number of destinations
- **Holiday lookup:** O(1)
- **Date calculations:** O(1)
- **Total recommendation time:** < 10ms for full dataset

## Data Integrity

- All dates in ISO 8601 format (YYYY-MM-DD)
- All prices in USD
- All timestamps in UTC
- No external dependencies
- Pure deterministic calculations

## Backend to Frontend Contract

The frontend will receive standardized JSON objects from these functions. The frontend should:

1. **Display Holidays:** Show 5 available holidays with min/max vacation options
2. **Show Vacation Period:** Display selected dates and total days off
3. **Display Destinations:** Show destination cards with flight prices
4. **Sort/Filter:** Allow users to sort by price, duration, or type
5. **Book Action:** When user selects, capture the full recommendation object

## Next Phase: Frontend Integration

The frontend will:
1. Call `getAllHolidays()` to populate holiday selector
2. Call `calculateVacationPeriod()` when user adjusts vacation days
3. Call `generateTripRecommendations()` to get full recommendation set
4. Display results in interactive cards with sorting/filtering
5. Store selected recommendation for booking workflow
