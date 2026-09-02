# Flight API Contracts - What's Actually Available (2024-2026)

## 🚨 THE REALITY CHECK

Most flight APIs are **CLOSED TO NEW DEVELOPERS**. Here's what's actually available:

---

## 1. ❌ AMADEUS (SELF-SERVICE SHUTDOWN - July 17, 2026)
**Status:** CLOSED for new developers

### What Happened
- Amadeus shut down their **Self-Service API program** on July 17, 2026
- All new access is **Enterprise-only** (requires 6-figure contracts)
- If you have an existing Amadeus business relationship, you can still use it
- Otherwise: NOT accessible

### API Endpoints (for reference):
```
https://test.api.amadeus.com/v1/shopping/flight-offers-search
https://test.api.amadeus.com/v1/shopping/flight-offers-pricing
https://test.api.amadeus.com/v1/shopping/flight-offers/1/seat-maps
https://test.api.amadeus.com/v1/booking/flight-orders
```

### Request Example (LEGACY - no longer available):
```javascript
GET https://test.api.amadeus.com/v1/shopping/flight-offers-search?
  originLocationCode=SYD
  &destinationLocationCode=BKK
  &departureDate=2022-06-01
  &adults=2
  
Header: Authorization: Bearer YOUR_TOKEN
```

---

## 2. ❌ SKYSCANNER (PARTNER-ONLY)
**Status:** CLOSED to public

### API Type
- Official Skyscanner API requires partner approval
- Must apply at: `partners.skyscanner.net`
- Approval takes ~2 weeks, NOT guaranteed
- Requires: established travel business + audience

### Public Wrapper Option
- **Sky Scrapper on RapidAPI** (third-party wrapper)
- Free tier: Limited calls
- Requires: RapidAPI account + API key

---

## 3. ❌ KIWI.COM TEQUILA (INVITATION-ONLY)
**Status:** CLOSED since May 2024

### What Changed
- Was free + self-service (2019-2024)
- Now: **Invite-only partnerships only**
- New developers: NOT accepted
- Alternative route: Travelpayouts (requires 50K MAU)

---

## 4. ✅ SKY SCRAPPER API (RapidAPI) - ACTUALLY ACCESSIBLE

**This is the one you CAN use right now**

### Signup
1. Go to: https://rapidapi.com
2. Create free account
3. Search: "Sky Scrapper"
4. Subscribe to BASIC plan (free)
5. Copy your `X-RapidAPI-Key`

### API Endpoint
```
https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights
```

### Required Parameters
```javascript
{
  originSkyId: "LOND",          // Origin airport sky ID
  destinationSkyId: "NYCA",     // Destination airport sky ID
  originEntityId: "27544008",   // Origin entity ID
  destinationEntityId: "27544019", // Destination entity ID
  date: "2024-12-01",           // Departure date (YYYY-MM-DD)
  cabinClass: "economy",        // economy, premium_economy, business, first
  adults: 1,                    // Number of adults
  children: 0,                  // Number of children
  sortBy: "best",               // best, cheapest, fastest
  currency: "USD"               // Currency code
}
```

### Example Request (JavaScript/Node.js)
```javascript
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'YOUR_API_KEY_HERE',
    'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
  }
};

fetch(
  'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights?' +
  'originSkyId=LOND' +
  '&destinationSkyId=NYCA' +
  '&originEntityId=27544008' +
  '&destinationEntityId=27544019' +
  '&date=2024-12-01' +
  '&cabinClass=economy' +
  '&adults=1' +
  '&sortBy=best' +
  '&currency=USD',
  options
)
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### Response Format
```json
{
  "status": true,
  "timestamp": 1234567890,
  "data": {
    "itineraries": [
      {
        "id": "flight_001",
        "price": {
          "raw": 245.50,
          "formatted": "$245.50"
        },
        "legs": [
          {
            "id": "leg_001",
            "departure": "2024-12-01T10:30:00",
            "arrival": "2024-12-01T16:45:00",
            "durationInMinutes": 375,
            "stopCount": 0,
            "carriers": [
              {
                "id": 1234,
                "name": "Southwest",
                "alliance": null,
                "logoUrl": "..."
              }
            ],
            "segments": [
              {
                "id": "seg_001",
                "departure": "2024-12-01T10:30:00",
                "arrival": "2024-12-01T16:45:00",
                "durationInMinutes": 375,
                "stopCount": 0,
                "carrier": {
                  "id": 1234,
                  "name": "Southwest"
                },
                "aircraft": "Boeing 737",
                "operatingCarrier": { "id": 1234 }
              }
            ]
          }
        ],
        "isMotorisable": true,
        "isSelfTransfer": false,
        "isProtectedSelfTransfer": false,
        "farePolicy": {
          "isChangeAllowedBeforeDeparture": true,
          "isPartiallyChangeable": false,
          "isCancellationAllowedBeforeDeparture": true,
          "isPartiallyRefundable": false
        }
      }
    ],
    "sessionId": "abc123xyz"
  }
}
```

### Rate Limits
- **Free tier:** Limited calls/month
- **Paid tier:** More calls available
- Check RapidAPI dashboard for your limits

---

## 5. ✅ DUFFEL API - TEST MODE (MOCK DATA)

**Use for testing/development with sandbox data**

### Signup
1. Go to: https://www.duffel.com/
2. Create account
3. Get test API key (no credit card needed)
4. Use test mode (returns mock data)

### API Endpoint
```
https://api.duffel.com/air/search_sessions/
```

### Example (Mock Search)
```javascript
const response = await fetch(
  'https://api.duffel.com/air/search_sessions/',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer duffel_test_YOUR_KEY',
      'Content-Type': 'application/json',
      'Duffel-Version': '2'
    },
    body: JSON.stringify({
      type: 'return',
      passengers: [
        {
          type: 'adult',
          given_name: 'John',
          family_name: 'Doe'
        }
      ],
      slices: [
        {
          origin: 'LHR',
          destination: 'JFK',
          departure_date: '2024-12-01'
        },
        {
          origin: 'JFK',
          destination: 'LHR',
          departure_date: '2024-12-08'
        }
      ]
    })
  }
);

const data = await response.json();
console.log(data);
```

### Test Mode Response (Mock)
```json
{
  "data": {
    "id": "ses_001",
    "search_type": "return",
    "created_at": "2024-12-01T10:30:00.000Z",
    "passengers": [...],
    "offers": [
      {
        "id": "off_001",
        "base_amount": "245.50",
        "currency": "USD",
        "slices": [...]
      }
    ]
  }
}
```

---

## 6. ❌ GOOGLE FLIGHTS
**Status:** NO PUBLIC API

- Google does NOT offer an official flights API
- You can use:
  - Their web interface (manually)
  - Third-party scrapers (legal gray area)
  - Or use Amadeus/Sky Scrapper instead

---

## 7. ❌ KAYAK
**Status:** NO PUBLIC API

- No official public API
- Owned by Booking.com
- Would need to scrape or use affiliate links

---

## 📊 Comparison Table

| API | Free? | Status | Accessible? | Real Data? |
|-----|-------|--------|-------------|-----------|
| **Sky Scrapper** (RapidAPI) | ✅ Yes | Active | ✅ YES | ✅ Yes |
| **Duffel** (Test Mode) | ✅ Yes | Active | ✅ YES | ❌ Mock only |
| **Amadeus** | ❌ No | Closed (July 2026) | ❌ NO | N/A |
| **Skyscanner** | ❌ No | Partner-only | ❌ NO | N/A |
| **Kiwi.com** | ❌ No | Invite-only (since 2024) | ❌ NO | N/A |
| **Google Flights** | ❌ No | No public API | ❌ NO | N/A |
| **Kayak** | ❌ No | No public API | ❌ NO | N/A |

---

## 🛠️ RECOMMENDED APPROACH FOR YOUR PROJECT

### Option 1: Use Sky Scrapper (RECOMMENDED)
✅ **Pros:**
- Actually accessible right now
- Real flight data
- Free tier available
- Easy to integrate

❌ **Cons:**
- RapidAPI dependent
- Limited free calls
- Third-party wrapper

### Option 2: Use Duffel (FOR TESTING)
✅ **Pros:**
- Free sandbox mode
- Good for development
- Clean API design

❌ **Cons:**
- Mock data only (no real prices)
- Not for production

### Option 3: Build a Backend + Scraper
✅ **Pros:**
- Full control
- Can use multiple sources

❌ **Cons:**
- Complex architecture
- Legal/ToS risks
- Maintenance heavy

### Option 4: Wait for Partner Access
✅ **Pros:**
- Get official APIs

❌ **Cons:**
- May never get approved
- Takes months/years
- Requires established business

---

## 🚀 WHAT TO DO NOW

1. **Sign up for RapidAPI + Sky Scrapper** (5 minutes)
2. **Get your API key** 
3. **Test the endpoint** with Postman/cURL
4. **Integrate into backend** (Node.js/Python)
5. **Replace mock data** in your SkyPulse app

---

## Next Steps?

Want me to:
1. Build a **Node.js backend** that calls Sky Scrapper API?
2. Show you how to integrate it into your SkyPulse app?
3. Handle API key securely?
4. Set up caching to avoid hitting API limits?

Let me know! 🚀
