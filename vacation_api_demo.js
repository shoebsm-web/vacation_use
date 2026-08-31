/**
 * VACATION PLANNING BACKEND - API DEMO & DOCUMENTATION
 * Shows how to use the backend to get trip recommendations and flight prices
 */

const backend = require('./vacation_backend');

// ============================================================================
// EXAMPLE 1: Get all available holidays
// ============================================================================

console.log('\n' + '='.repeat(70));
console.log('EXAMPLE 1: GET ALL AVAILABLE HOLIDAYS');
console.log('='.repeat(70));

const allHolidays = backend.getAllHolidays();
console.log('\nAvailable holidays:');
allHolidays.forEach(h => {
  console.log(`\n  ${h.name} (${h.date})`);
  console.log(`    Day: ${h.dayOfWeek}`);
  console.log(`    Min vacation days needed: ${h.minVacationDays}`);
  console.log(`    Suggested vacation days: ${h.suggestedDays.join(', ')}`);
  console.log(`    Total possible days off: ${h.totalDaysAvailable}`);
});

// ============================================================================
// EXAMPLE 2: Calculate vacation period for Labor Day
// ============================================================================

console.log('\n' + '='.repeat(70));
console.log('EXAMPLE 2: CALCULATE VACATION PERIOD - LABOR DAY');
console.log('='.repeat(70));

// Labor Day (Monday, Sept 7) + 1 day = 4-day weekend
const laborDayTrip1 = backend.calculateVacationPeriod('labor-day', 1);
console.log('\nLabor Day + 1 vacation day:');
console.log(JSON.stringify(laborDayTrip1, null, 2));

// Labor Day + 3 days = 5-day vacation
const laborDayTrip2 = backend.calculateVacationPeriod('labor-day', 3);
console.log('\nLabor Day + 3 vacation days:');
console.log(JSON.stringify(laborDayTrip2, null, 2));

// ============================================================================
// EXAMPLE 3: Get flight prices for Labor Day weekend
// ============================================================================

console.log('\n' + '='.repeat(70));
console.log('EXAMPLE 3: GET FLIGHT PRICES - LABOR DAY WEEKEND');
console.log('='.repeat(70));

const laborDayPeriod = backend.calculateVacationPeriod('labor-day', 1);

// Get prices for different destinations
const miamiPrice = backend.calculateFlightPrice('miami', laborDayPeriod, 'economy');
console.log('\nMiami flight price (Labor Day weekend, economy):');
console.log(JSON.stringify(miamiPrice, null, 2));

const parisPrice = backend.calculateFlightPrice('france', laborDayPeriod, 'economy');
console.log('\nParis flight price (Labor Day weekend, economy):');
console.log(JSON.stringify(parisPrice, null, 2));

// ============================================================================
// EXAMPLE 4: Get full trip recommendations
// ============================================================================

console.log('\n' + '='.repeat(70));
console.log('EXAMPLE 4: FULL TRIP RECOMMENDATIONS - THANKSGIVING');
console.log('='.repeat(70));

// Thanksgiving (Thursday Nov 26) + 3 vacation days = 6 days off
const thanksgivingRecommendations = backend.generateTripRecommendations('thanksgiving', 3, 10);
console.log('\nThanksgiving trip recommendations (3 vacation days):');
console.log(`\nTrip Summary:`);
console.log(`  Duration: ${thanksgivingRecommendations.vacationPeriod.totalDaysOff} days off`);
console.log(`  Dates: ${thanksgivingRecommendations.vacationPeriod.dayRange}`);
console.log(`  Number of destinations: ${thanksgivingRecommendations.numDestinations}`);
console.log(`  Average flight cost: $${thanksgivingRecommendations.summary.averageFlightCost}`);

console.log('\nTop 3 destination recommendations:');
thanksgivingRecommendations.flightOptions.slice(0, 3).forEach((option, idx) => {
  console.log(`\n  ${idx + 1}. ${option.destination.name}, ${option.destination.country}`);
  console.log(`     Region: ${option.destination.region}`);
  console.log(`     Type: ${option.destination.type}`);
  console.log(`     Best for: ${option.destination.bestFor.join(', ')}`);
  console.log(`     Hotel range: ${option.destination.hotelRange}`);
  console.log(`     Flight cost (economy): $${option.economy.estimatedPrice}`);
  console.log(`     Price range: $${option.economy.priceRange.min} - $${option.economy.priceRange.max}`);
  console.log(`     Airlines: ${option.economy.airlines.join(', ')}`);
});

// ============================================================================
// EXAMPLE 5: Christmas holiday planning
// ============================================================================

console.log('\n' + '='.repeat(70));
console.log('EXAMPLE 5: CHRISTMAS HOLIDAY - MAX VACATION');
console.log('='.repeat(70));

// Christmas (Friday Dec 25) + 5 days = 10 days off total
const christmasMax = backend.generateTripRecommendations('christmas', 5, 15);
console.log('\nChristmas vacation (5 extra days) - Extended holiday:');
console.log(`  Duration: ${christmasMax.vacationPeriod.totalDaysOff} days off`);
console.log(`  Dates: ${christmasMax.vacationPeriod.dayRange}`);
console.log(`  Vacation days needed: ${christmasMax.vacationPeriod.vacationDaysAdded}`);
console.log(`  Number of viable destinations: ${christmasMax.numDestinations}`);
console.log(`  Average flight cost: $${christmasMax.summary.averageFlightCost}`);

// ============================================================================
// API REFERENCE DOCUMENTATION
// ============================================================================

console.log('\n' + '='.repeat(70));
console.log('API REFERENCE - AVAILABLE FUNCTIONS');
console.log('='.repeat(70));

const apiReference = `

BACKEND API FUNCTIONS:

1. getAllHolidays()
   Returns: Array of all holiday objects with dates and details
   Usage: backend.getAllHolidays()

2. getHoliday(holidayId)
   Params: holidayId (string) - 'labor-day', 'columbus-day', 'thanksgiving', 'christmas', 'veterans-day'
   Returns: Single holiday object
   Usage: backend.getHoliday('thanksgiving')

3. getAllDestinations()
   Returns: Array of all destination objects
   Usage: backend.getAllDestinations()

4. getDestination(destinationId)
   Params: destinationId (string) - 'nyc', 'miami', 'france', 'japan', etc.
   Returns: Single destination object with details
   Usage: backend.getDestination('miami')

5. calculateVacationPeriod(holidayId, vacationDaysAdded)
   Params:
     - holidayId: string ('labor-day', 'thanksgiving', etc.)
     - vacationDaysAdded: number (0-6, how many vacation days to add before holiday)
   Returns: Object with start date, end date, total days off
   Usage: backend.calculateVacationPeriod('thanksgiving', 3)

6. getDestinationsByTrip(vacationPeriod)
   Params: vacationPeriod object from calculateVacationPeriod()
   Returns: Array of destinations recommended for this trip duration
   Usage: backend.getDestinationsByTrip(vacationPeriod)

7. calculateFlightPrice(destinationId, vacationPeriod, flightClass)
   Params:
     - destinationId: string ('miami', 'france', etc.)
     - vacationPeriod: object from calculateVacationPeriod()
     - flightClass: string ('economy', 'premium-economy', 'business', 'first')
   Returns: Object with estimated price, price range, airlines
   Usage: backend.calculateFlightPrice('miami', vacationPeriod, 'economy')

8. generateTripRecommendations(holidayId, vacationDaysAdded, numDestinations)
   Params:
     - holidayId: string
     - vacationDaysAdded: number
     - numDestinations: number (default 8, max recommended destinations to return)
   Returns: Comprehensive object with vacation period + flight options for all destinations
   Usage: backend.generateTripRecommendations('thanksgiving', 3, 10)

RETURN OBJECT EXAMPLES:

calculateVacationPeriod() returns:
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

calculateFlightPrice() returns:
{
  destinationId: 'miami',
  destinationName: 'Miami',
  basePrice: 220,
  pricePerDay: 55,
  flightClass: 'economy',
  estimatedPrice: 264,
  priceRange: { min: 224, max: 304 },
  departureDate: '2026-11-23',
  returnDate: '2026-11-26',
  tripDuration: 4,
  airlines: ['American', 'Delta']
}

generateTripRecommendations() returns:
{
  vacationPeriod: { ... },
  numDestinations: 10,
  flightOptions: [ { economy, premiumEconomy, destination }, ... ],
  summary: {
    totalDaysOff: 4,
    tripDates: '2026-11-23 to 2026-11-26',
    availableDestinations: 10,
    averageFlightCost: 250
  }
}
`;

console.log(apiReference);
