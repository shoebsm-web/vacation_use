/**
 * VACATION PLANNING BACKEND
 * Handles holiday data, destination management, and flight pricing
 */

// ============================================================================
// HOLIDAY & WEEKEND DATA
// ============================================================================

const HOLIDAYS_2026 = [
  {
    id: 'labor-day',
    name: 'Labor Day',
    date: '2026-09-07',
    dayOfWeek: 'Monday',
    minVacationDays: 1,
    defaultVacationDays: 1,
    suggestedDays: [1, 3],
    totalDaysAvailable: 4,
    description: 'Summer holiday'
  },
  {
    id: 'columbus-day',
    name: 'Columbus Day',
    date: '2026-10-12',
    dayOfWeek: 'Monday',
    minVacationDays: 1,
    defaultVacationDays: 1,
    suggestedDays: [1, 3],
    totalDaysAvailable: 4,
    description: 'Fall holiday'
  },
  {
    id: 'veterans-day',
    name: 'Veterans Day',
    date: '2026-11-11',
    dayOfWeek: 'Wednesday',
    minVacationDays: 3,
    defaultVacationDays: 3,
    suggestedDays: [2, 3, 5],
    totalDaysAvailable: 5,
    description: 'Mid-week holiday (limited advantage)'
  },
  {
    id: 'thanksgiving',
    name: 'Thanksgiving',
    date: '2026-11-26',
    dayOfWeek: 'Thursday',
    minVacationDays: 2,
    defaultVacationDays: 3,
    suggestedDays: [2, 3, 4, 5],
    totalDaysAvailable: 6,
    description: 'Most employers give Friday off too'
  },
  {
    id: 'christmas',
    name: 'Christmas',
    date: '2026-12-25',
    dayOfWeek: 'Friday',
    minVacationDays: 4,
    defaultVacationDays: 5,
    suggestedDays: [4, 5, 6],
    totalDaysAvailable: 12,
    description: 'Best option: combine with New Year'
  }
];

// ============================================================================
// DESTINATION DATABASE
// ============================================================================

const DESTINATIONS = [
  // Domestic Destinations
  {
    id: 'nyc',
    name: 'New York City',
    region: 'Northeast',
    country: 'USA',
    airports: ['JFK', 'LGA', 'EWR'],
    avgFlightCost: 180,
    type: 'City',
    bestFor: ['holidays', 'shopping', 'culture'],
    climate: ['cold', 'winter-weather'],
    hotelRange: '$150-$400/night'
  },
  {
    id: 'miami',
    name: 'Miami',
    region: 'Southeast',
    country: 'USA',
    airports: ['MIA', 'FLL'],
    avgFlightCost: 220,
    type: 'Beach',
    bestFor: ['warm-weather', 'relaxation', 'nightlife'],
    climate: ['warm', 'tropical'],
    hotelRange: '$120-$350/night'
  },
  {
    id: 'los-angeles',
    name: 'Los Angeles',
    region: 'West',
    country: 'USA',
    airports: ['LAX', 'BUR', 'LGB'],
    avgFlightCost: 280,
    type: 'City/Beach',
    bestFor: ['entertainment', 'sunshine', 'hiking'],
    climate: ['warm', 'sunny'],
    hotelRange: '$130-$380/night'
  },
  {
    id: 'chicago',
    name: 'Chicago',
    region: 'Midwest',
    country: 'USA',
    airports: ['ORD', 'MDW'],
    avgFlightCost: 150,
    type: 'City',
    bestFor: ['architecture', 'food', 'museums'],
    climate: ['cold', 'winter-weather'],
    hotelRange: '$100-$300/night'
  },
  {
    id: 'denver',
    name: 'Denver',
    region: 'Mountain',
    country: 'USA',
    airports: ['DEN'],
    avgFlightCost: 200,
    type: 'Mountain/City',
    bestFor: ['hiking', 'skiing', 'outdoors'],
    climate: ['cold', 'snow'],
    hotelRange: '$110-$320/night'
  },
  {
    id: 'new-orleans',
    name: 'New Orleans',
    region: 'South',
    country: 'USA',
    airports: ['MSY'],
    avgFlightCost: 190,
    type: 'City',
    bestFor: ['food', 'culture', 'nightlife'],
    climate: ['mild', 'humid'],
    hotelRange: '$90-$250/night'
  },
  {
    id: 'san-francisco',
    name: 'San Francisco',
    region: 'West',
    country: 'USA',
    airports: ['SFO', 'OAK', 'SJC'],
    avgFlightCost: 260,
    type: 'City/Coast',
    bestFor: ['tech', 'food', 'scenery'],
    climate: ['cool', 'foggy'],
    hotelRange: '$150-$400/night'
  },
  {
    id: 'boston',
    name: 'Boston',
    region: 'Northeast',
    country: 'USA',
    airports: ['BOS'],
    avgFlightCost: 170,
    type: 'City',
    bestFor: ['history', 'food', 'fall-foliage'],
    climate: ['cold', 'winter-weather'],
    hotelRange: '$120-$350/night'
  },
  {
    id: 'key-west',
    name: 'Key West',
    region: 'Southeast',
    country: 'USA',
    airports: ['EYW'],
    avgFlightCost: 240,
    type: 'Beach',
    bestFor: ['beach', 'relaxation', 'nightlife'],
    climate: ['warm', 'tropical'],
    hotelRange: '$140-$400/night'
  },
  {
    id: 'vegas',
    name: 'Las Vegas',
    region: 'Southwest',
    country: 'USA',
    airports: ['LAS'],
    avgFlightCost: 210,
    type: 'Entertainment',
    bestFor: ['entertainment', 'nightlife', 'shows'],
    climate: ['mild', 'desert'],
    hotelRange: '$50-$250/night'
  },

  // International Destinations
  {
    id: 'cancun',
    name: 'Cancún',
    region: 'Caribbean',
    country: 'Mexico',
    airports: ['CUN'],
    avgFlightCost: 320,
    type: 'Beach',
    bestFor: ['beach', 'all-inclusive', 'water-sports'],
    climate: ['warm', 'tropical', 'hurricane-season'],
    hotelRange: '$80-$300/night'
  },
  {
    id: 'los-cabos',
    name: 'Los Cabos',
    region: 'Mexico',
    country: 'Mexico',
    airports: ['SJD'],
    avgFlightCost: 340,
    type: 'Beach',
    bestFor: ['luxury', 'golf', 'beach'],
    climate: ['warm', 'desert'],
    hotelRange: '$150-$500/night'
  },
  {
    id: 'costa-rica',
    name: 'San José, Costa Rica',
    region: 'Central America',
    country: 'Costa Rica',
    airports: ['SJO'],
    avgFlightCost: 380,
    type: 'Adventure',
    bestFor: ['nature', 'eco-tourism', 'adventure'],
    climate: ['warm', 'tropical', 'rain-season'],
    hotelRange: '$70-$250/night'
  },
  {
    id: 'belize',
    name: 'Belize City',
    region: 'Central America',
    country: 'Belize',
    airports: ['BZE'],
    avgFlightCost: 360,
    type: 'Beach/Adventure',
    bestFor: ['beach', 'diving', 'adventure'],
    climate: ['warm', 'tropical'],
    hotelRange: '$80-$280/night'
  },
  {
    id: 'caribbean-islands',
    name: 'Caribbean (Various)',
    region: 'Caribbean',
    country: 'Caribbean',
    airports: ['SJU', 'STT', 'AUA'],
    avgFlightCost: 350,
    type: 'Beach',
    bestFor: ['beach', 'relaxation', 'water-sports'],
    climate: ['warm', 'tropical'],
    hotelRange: '$100-$350/night'
  },
  {
    id: 'japan',
    name: 'Tokyo/Osaka',
    region: 'Asia',
    country: 'Japan',
    airports: ['NRT', 'HND', 'KIX'],
    avgFlightCost: 650,
    type: 'Culture/Food',
    bestFor: ['culture', 'food', 'technology'],
    climate: ['cool', 'winter'],
    hotelRange: '$80-$300/night'
  },
  {
    id: 'italy',
    name: 'Rome/Milan',
    region: 'Europe',
    country: 'Italy',
    airports: ['FCO', 'MXP'],
    avgFlightCost: 580,
    type: 'Culture/History',
    bestFor: ['history', 'food', 'art'],
    climate: ['cold', 'winter'],
    hotelRange: '$80-$280/night'
  },
  {
    id: 'france',
    name: 'Paris',
    region: 'Europe',
    country: 'France',
    airports: ['CDG', 'ORY'],
    avgFlightCost: 560,
    type: 'Culture/Romance',
    bestFor: ['romance', 'art', 'food'],
    climate: ['cold', 'winter'],
    hotelRange: '$100-$350/night'
  },
  {
    id: 'spain',
    name: 'Barcelona/Madrid',
    region: 'Europe',
    country: 'Spain',
    airports: ['BCN', 'MAD'],
    avgFlightCost: 520,
    type: 'Culture/Beach',
    bestFor: ['architecture', 'food', 'culture'],
    climate: ['mild', 'winter'],
    hotelRange: '$70-$250/night'
  },
  {
    id: 'uk',
    name: 'London',
    region: 'Europe',
    country: 'United Kingdom',
    airports: ['LHR', 'LGW', 'STN'],
    avgFlightCost: 480,
    type: 'City/Culture',
    bestFor: ['history', 'shopping', 'culture'],
    climate: ['cold', 'winter'],
    hotelRange: '$90-$300/night'
  }
];

// ============================================================================
// DATE CALCULATION UTILITIES
// ============================================================================

function dateStringToObj(dateStr) {
  return new Date(dateStr + 'T00:00:00Z');
}

function getDayOfWeek(dateStr) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = dateStringToObj(dateStr);
  return days[date.getUTCDay()];
}

function calculateVacationPeriod(holidayId, vacationDaysAdded) {
  const holiday = HOLIDAYS_2026.find(h => h.id === holidayId);
  if (!holiday) return null;

  const holidayDate = dateStringToObj(holiday.date);
  const dayOfWeek = holidayDate.getUTCDay(); // 0=Sunday, 1=Monday, etc.

  // Determine the Friday before
  const daysSinceFriday = (dayOfWeek + 2) % 7; // Days since last Friday
  const fridayBefore = new Date(holidayDate);
  fridayBefore.setUTCDate(fridayBefore.getUTCDate() - daysSinceFriday);

  // Determine the Sunday after
  const daysUntilSunday = (7 - dayOfWeek) % 7 || 7;
  const sundayAfter = new Date(holidayDate);
  sundayAfter.setUTCDate(sundayAfter.getUTCDate() + daysUntilSunday);

  // Calculate vacation period
  let startDate, endDate, totalDaysOff;

  if (vacationDaysAdded === 0) {
    startDate = new Date(holidayDate);
    endDate = new Date(holidayDate);
    totalDaysOff = 1;
  } else if (vacationDaysAdded === 1) {
    startDate = new Date(holidayDate);
    startDate.setUTCDate(startDate.getUTCDate() - 1);
    endDate = new Date(holidayDate);
    totalDaysOff = 2;
  } else if (vacationDaysAdded === 2) {
    startDate = new Date(holidayDate);
    startDate.setUTCDate(startDate.getUTCDate() - 2);
    endDate = new Date(holidayDate);
    totalDaysOff = 3;
  } else if (vacationDaysAdded === 3) {
    startDate = new Date(holidayDate);
    startDate.setUTCDate(startDate.getUTCDate() - 3);
    endDate = new Date(holidayDate);
    totalDaysOff = 4;
  } else if (vacationDaysAdded === 4) {
    startDate = new Date(fridayBefore);
    endDate = new Date(sundayAfter);
    totalDaysOff = 9;
  } else {
    startDate = new Date(fridayBefore);
    endDate = new Date(sundayAfter);
    endDate.setUTCDate(endDate.getUTCDate() + (vacationDaysAdded - 4));
    totalDaysOff = vacationDaysAdded + 2;
  }

  const startStr = startDate.toISOString().split('T')[0];
  const endStr = endDate.toISOString().split('T')[0];

  return {
    holidayId,
    holidayName: holiday.name,
    vacationDaysAdded,
    startDate: startStr,
    endDate: endStr,
    totalDaysOff,
    dayRange: `${startStr} to ${endStr}`,
    numberOfNights: totalDaysOff - 1
  };
}

// ============================================================================
// DESTINATION FILTERING & MATCHING
// ============================================================================

function getDestinationsByTrip(vacationPeriod) {
  // Recommend destinations based on duration and holiday
  const numDays = vacationPeriod.totalDaysOff;
  const holiday = HOLIDAYS_2026.find(h => h.id === vacationPeriod.holidayId);

  let recommendedDests = [];

  // Filter by trip length and season
  if (numDays <= 4) {
    // Short trips: nearby domestic destinations
    recommendedDests = DESTINATIONS.filter(d => d.country === 'USA' || d.region === 'Caribbean');
  } else if (numDays <= 6) {
    // Medium trips: domestic and nearby international
    recommendedDests = DESTINATIONS.filter(d => 
      d.country === 'USA' || ['Caribbean', 'Mexico', 'Central America'].includes(d.region)
    );
  } else {
    // Long trips: all destinations viable
    recommendedDests = DESTINATIONS;
  }

  // Filter by season/climate
  if (holiday.id === 'thanksgiving' || holiday.id === 'christmas') {
    // Winter: prefer warm climates
    recommendedDests = recommendedDests.sort((a, b) => {
      const aWarm = a.climate.includes('warm') || a.climate.includes('tropical') ? 1 : 0;
      const bWarm = b.climate.includes('warm') || b.climate.includes('tropical') ? 1 : 0;
      return bWarm - aWarm;
    });
  } else {
    // Fall: prefer mild to warm
    recommendedDests = recommendedDests.sort((a, b) => {
      const aGood = !a.climate.includes('cold') ? 1 : 0;
      const bGood = !b.climate.includes('cold') ? 1 : 0;
      return bGood - aGood;
    });
  }

  return recommendedDests;
}

function getDestinationDetails(destinationId) {
  return DESTINATIONS.find(d => d.id === destinationId);
}

// ============================================================================
// FLIGHT PRICE CALCULATION
// ============================================================================

function calculateFlightPrice(destinationId, vacationPeriod, flightClass = 'economy') {
  const destination = DESTINATIONS.find(d => d.id === destinationId);
  if (!destination) return null;

  // Base price from destination data
  let basePrice = destination.avgFlightCost;

  // Adjust based on trip length (longer trips might have better rates per night)
  const numDays = vacationPeriod.totalDaysOff;
  if (numDays <= 3) {
    basePrice *= 1.2; // Short trips cost more per day
  } else if (numDays >= 10) {
    basePrice *= 0.9; // Long trips get discount
  }

  // Adjust based on class
  const classMultipliers = {
    'economy': 1.0,
    'premium-economy': 1.35,
    'business': 2.5,
    'first': 4.0
  };

  const finalPrice = Math.round(basePrice * (classMultipliers[flightClass] || 1.0));

  // Add price variance for realism (±15%)
  const variance = finalPrice * 0.15;
  const priceMin = Math.round(finalPrice - variance);
  const priceMax = Math.round(finalPrice + variance);

  return {
    destinationId,
    destinationName: destination.name,
    basePrice: Math.round(basePrice),
    pricePerDay: Math.round(finalPrice / numDays),
    flightClass,
    estimatedPrice: finalPrice,
    priceRange: {
      min: priceMin,
      max: priceMax
    },
    departureDate: vacationPeriod.startDate,
    returnDate: vacationPeriod.endDate,
    tripDuration: numDays,
    airlines: ['American', 'United', 'Delta', 'Southwest', 'JetBlue'].slice(0, Math.floor(Math.random() * 3) + 2)
  };
}

// ============================================================================
// FULL TRIP RECOMMENDATION ENGINE
// ============================================================================

function generateTripRecommendations(holidayId, vacationDaysAdded, numDestinations = 8) {
  // Calculate vacation period
  const vacationPeriod = calculateVacationPeriod(holidayId, vacationDaysAdded);
  if (!vacationPeriod) return { error: 'Invalid holiday or vacation days' };

  // Get destination recommendations
  const recommendedDests = getDestinationsByTrip(vacationPeriod).slice(0, numDestinations);

  // Calculate flight prices for each destination
  const flightOptions = recommendedDests.map(dest => {
    return {
      economy: calculateFlightPrice(dest.id, vacationPeriod, 'economy'),
      premiumEconomy: calculateFlightPrice(dest.id, vacationPeriod, 'premium-economy'),
      destination: {
        id: dest.id,
        name: dest.name,
        region: dest.region,
        country: dest.country,
        type: dest.type,
        hotelRange: dest.hotelRange,
        bestFor: dest.bestFor
      }
    };
  });

  return {
    vacationPeriod,
    numDestinations: flightOptions.length,
    flightOptions,
    summary: {
      totalDaysOff: vacationPeriod.totalDaysOff,
      tripDates: vacationPeriod.dayRange,
      availableDestinations: flightOptions.length,
      averageFlightCost: Math.round(
        flightOptions.reduce((sum, opt) => sum + opt.economy.estimatedPrice, 0) / flightOptions.length
      )
    }
  };
}

// ============================================================================
// EXPORT API
// ============================================================================

module.exports = {
  // Holiday data
  HOLIDAYS_2026,
  getHoliday: (holidayId) => HOLIDAYS_2026.find(h => h.id === holidayId),
  getAllHolidays: () => HOLIDAYS_2026,

  // Destination data
  DESTINATIONS,
  getDestination: getDestinationDetails,
  getAllDestinations: () => DESTINATIONS,

  // Calculations
  calculateVacationPeriod,
  getDestinationsByTrip,
  calculateFlightPrice,
  generateTripRecommendations,

  // Utilities
  dateStringToObj,
  getDayOfWeek
};
