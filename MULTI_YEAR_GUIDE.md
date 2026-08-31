# 🗓️ Multi-Year Vacation Planner - Complete Guide

## What's New: Plan Vacations for 2026, 2027, 2028+

Your vacation planner now supports **multiple years**, **price comparisons across years**, and **smart price trends**.

---

## 🎯 New Features

### 1. **Multi-Year Holiday Selection**
- Plan for 2026, 2027, and 2028
- All federal holidays for each year pre-loaded
- One-click year switching

### 2. **Year-to-Year Price Comparison**
- Compare the same holiday across different years
- See which year has cheapest flights
- Make multi-year vacation plans

### 3. **Price Trends**
- Visualize how flight prices change year-to-year
- Predict best times to book
- Plan ahead for savings

### 4. **Saved Trips**
- Save favorite vacations locally
- No account needed (stored in browser)
- Quick access to past searches

### 5. **Advanced Search Capabilities**
- Date comparison (same holiday, different dates)
- Batch price lookups
- Seasonal trend analysis

---

## 📊 Architecture Changes

### Backend Enhanced

**New File:** `flight_comparison_server_enhanced.js`

**New Endpoints:**

```
GET  /api/holidays              - Get all holidays for all years
GET  /api/holidays/:year        - Get holidays for specific year
POST /api/compare-dates         - Compare prices across dates
POST /api/price-trends          - See price trends across years
```

**Database:**
- 2026: 10 federal holidays
- 2027: 10 federal holidays
- 2028: 10 federal holidays
- Easy to add 2029+ (just add array to HOLIDAYS_DATABASE)

**Destinations:**
- 20 destinations (domestic, Caribbean, international)
- Climate data for smart recommendations
- Easy to expand

---

## 🚀 How to Use

### Step 1: Setup (Same as Before)

```bash
npm install
npm start
```

### Step 2: Run Enhanced Backend

```bash
# Option A: Use new enhanced server
node src/backend/flight_comparison_server_enhanced.js

# Option B: Update package.json to use enhanced server
# Change: "start": "node src/backend/flight_comparison_server.js"
# To:     "start": "node src/backend/flight_comparison_server_enhanced.js"
```

### Step 3: Open New Frontend

```
Open: src/frontend/vacation_dashboard_multi_year.html
```

---

## 💻 Using Each Tab

### 🔍 Search Flights Tab

1. **Select Year** - Click 2026, 2027, or 2028
2. **Pick Holiday** - Click a holiday card
3. **Choose Destination** - Miami, Paris, Cancun, etc.
4. **Set From Airport** - Where you're flying from (default: DFW)
5. **Search** - Click "Find Cheapest Flights"
6. **Results** - See all prices + AI recommendation
7. **Save** - Click "Save Trip" on any flight

### 📊 Compare Years Tab

**See which year has cheapest flights for the same holiday**

1. Select a holiday (e.g., Thanksgiving)
2. Select destination (e.g., Miami)
3. Click "Compare Prices Across Years"
4. See table:
   - Thanksgiving 2026: $245 (Cheapest!)
   - Thanksgiving 2027: $280
   - Thanksgiving 2028: $260

**Use Case:** Plan your Thanksgiving trip 3 years in advance. Book when prices are lowest.

### 📈 Price Trends Tab

**Visualize price changes over time**

1. Select holiday
2. Select destination
3. Click "Show Price Trends"
4. See bar chart showing:
   - 2026: $245 ■■■■■
   - 2027: $280 ■■■■■■
   - 2028: $260 ■■■■■

**Use Case:** Understand seasonal pricing patterns for better booking timing.

### ❤️ Saved Trips Tab

**Your favorite vacations**

1. Browse saved trips
2. See holiday, year, price
3. Delete trips you no longer want
4. Data stored locally (no account needed)

---

## 📱 File Structure

```
vacation_use/
├── src/
│   ├── backend/
│   │   ├── flight_comparison_server.js          (Original)
│   │   └── flight_comparison_server_enhanced.js ✨ NEW
│   └── frontend/
│       ├── vacation_dashboard_enhanced.html      (Original)
│       └── vacation_dashboard_multi_year.html    ✨ NEW
├── MULTI_YEAR_GUIDE.md                          ✨ THIS FILE
└── ... other files
```

---

## 🔄 Switching Servers

### Method 1: Run Both Simultaneously

```bash
# Terminal 1
node src/backend/flight_comparison_server.js

# Terminal 2
node src/backend/flight_comparison_server_enhanced.js
```

**But:** Don't do this! They'll conflict on port 3001.

### Method 2: Update package.json (Recommended)

In `package.json`, change:

```json
"start": "node src/backend/flight_comparison_server.js"
```

To:

```json
"start": "node src/backend/flight_comparison_server_enhanced.js"
```

Then:
```bash
npm start
```

### Method 3: Use Environment Variable

Set which server to use:

```bash
# Linux/Mac
SERVER=enhanced npm start

# Windows
set SERVER=enhanced && npm start
```

---

## 📊 API Examples

### Get All Holidays

```bash
curl http://localhost:3001/api/holidays
```

Response:
```json
{
  "success": true,
  "holidays": {
    "2026": [...],
    "2027": [...],
    "2028": [...]
  },
  "years": [2026, 2027, 2028]
}
```

### Get Holidays for Specific Year

```bash
curl http://localhost:3001/api/holidays/2027
```

### Compare Prices Across Dates

```bash
curl -X POST http://localhost:3001/api/compare-dates \
  -H "Content-Type: application/json" \
  -d '{
    "fromAirport": "DFW",
    "toAirport": "MIA",
    "dates": ["2026-11-26", "2027-11-25", "2028-11-23"]
  }'
```

### Get Price Trends

```bash
curl -X POST http://localhost:3001/api/price-trends \
  -H "Content-Type: application/json" \
  -d '{
    "fromAirport": "DFW",
    "toAirport": "MIA",
    "holiday": "Thanksgiving",
    "years": [2026, 2027, 2028]
  }'
```

---

## 🎓 How It All Works Together

```
User Interface (Multi-Year Dashboard)
        ↓
    Tab 1: Search Flights
    - Pick year 2026/2027/2028
    - Pick holiday + destination
    - Search → Backend calls APIs
    - See prices + AI recommendation
    ✨ NEW: Save to browser storage
    
    Tab 2: Compare Years
    - Same holiday, different years
    - See which year is cheapest
    - Plan multi-year vacations
    
    Tab 3: Price Trends
    - Visualize price patterns
    - Understand seasonal pricing
    - Best time to book
    
    Tab 4: Saved Trips
    - All your favorite vacations
    - No account needed
    - Browser storage (private!)
```

---

## 💡 Smart Use Cases

### Use Case 1: Plan Thanksgiving 3 Years Ahead
1. Go to "Compare Years" tab
2. Select "Thanksgiving" and "Miami"
3. See which Thanksgiving is cheapest
4. Book early for savings!

### Use Case 2: Find Best Price for Annual Vacation
1. Go to "Price Trends" tab
2. See year-to-year pricing pattern
3. Book in the cheapest year
4. Plan years in advance

### Use Case 3: Compare Multiple Destinations
1. Search Miami for Thanksgiving 2027 → $245
2. Search Paris for Thanksgiving 2027 → $680
3. Save both trips
4. Decide later which one to book

### Use Case 4: Track Price Changes
1. Search Thanksgiving 2027 → $280
2. Save trip
3. Check again in 2 months → $245
4. Book at the lower price!

---

## 🔧 Adding More Years

### To Add 2029:

Edit `flight_comparison_server_enhanced.js`:

```javascript
const HOLIDAYS_DATABASE = {
  // ... existing years ...
  2029: [
    { name: 'New Year\'s Day', date: '2029-01-01', month: 'January', day: 1 },
    // ... add all holidays for 2029 ...
  ]
};
```

### To Add More Holidays:

```javascript
2026: [
  // ... existing holidays ...
  { name: 'Your Holiday', date: '2026-XX-XX', month: 'Month', day: XX },
]
```

---

## 📊 Database Structure

### Holiday Format:
```javascript
{
  name: 'Holiday Name',           // "Thanksgiving"
  date: '2026-11-26',            // YYYY-MM-DD format
  month: 'Month Name',           // "November"
  day: 26                        // Day number
}
```

### Destination Format:
```javascript
{
  code: 'MIA',                   // Airport code
  name: 'Miami, FL',            // Display name
  type: 'domestic',             // domestic, caribbean, international
  climate: 'warm'               // warm, cold, cool
}
```

---

## 🎯 Data Stored Locally

### Saved Trips (Browser Storage)

Saved to browser's local storage:
```json
{
  "id": 1693482000,
  "airline": "Southwest",
  "price": 245,
  "holiday": "Thanksgiving",
  "year": 2026,
  "savedAt": "8/31/2026"
}
```

**Privacy:** All data stays on YOUR computer. No server storage.

---

## 🚀 Deploying Multi-Year Version

### To Production:

1. **Update package.json:**
```json
"start": "node src/backend/flight_comparison_server_enhanced.js"
```

2. **Deploy to Vercel:**
```bash
git add .
git commit -m "Add multi-year vacation planning"
git push
```

3. **Update frontend URL:**
In HTML, change API endpoint to production

4. **Push new HTML:**
```bash
git add src/frontend/vacation_dashboard_multi_year.html
git commit -m "Add multi-year dashboard"
git push
```

5. **Live at:**
- Website: `https://shoebsm-web.github.io/vacation_use/`
- Backend: `https://vacation-use.vercel.app/`

---

## 🐛 Troubleshooting

### Problem: API returns "Year not found"
**Solution:** Year not in HOLIDAYS_DATABASE. Add it first.

### Problem: Saved trips disappeared
**Solution:** Browser cache cleared. Cookies must be enabled.

### Problem: Prices showing as 0
**Solution:** API key limit reached. Wait for monthly reset.

### Problem: "Cannot connect to backend"
**Solution:** Make sure you're running the enhanced server on port 3001.

---

## 📈 Performance Tips

### For Faster Searches:
1. Use fewer date comparisons
2. Cache previous results
3. Search during off-peak hours
4. Limit to 3-5 destinations

### To Save API Calls:
- Compare within 5-day windows
- Focus on major holidays
- Reuse previous searches
- Check price trends first

---

## 🎊 What You Now Have

✅ **Single-year search** (original)
✅ **Multi-year planning** (2026, 2027, 2028)
✅ **Year-to-year comparison** (which year is cheapest)
✅ **Price trends** (visualize patterns)
✅ **Saved trips** (local storage)
✅ **AI recommendations** (Claude analysis)
✅ **5+ flight sources** (Google, Skyscanner, Kayak, Kiwi, Amadeus)
✅ **Beautiful UI** (dark theme, responsive)
✅ **100% Free** (APIs + hosting)

**Bonus:** Everything runs locally + deploys to cloud!

---

## 🎯 Next Steps

1. ✅ Use enhanced backend: `flight_comparison_server_enhanced.js`
2. ✅ Use multi-year frontend: `vacation_dashboard_multi_year.html`
3. ✅ Test all 4 tabs (Search, Compare, Trends, Saved)
4. ✅ Add more years to HOLIDAYS_DATABASE
5. ✅ Customize destinations for your needs
6. ✅ Deploy to production

---

## 📚 Files Reference

| File | Purpose |
|------|---------|
| `flight_comparison_server_enhanced.js` | Multi-year backend |
| `vacation_dashboard_multi_year.html` | Multi-year frontend |
| `MULTI_YEAR_GUIDE.md` | This guide |

---

## 🎉 You're Done!

You now have an **intelligent multi-year vacation planning system** that:
- Plans vacations 3+ years ahead
- Compares prices across years
- Shows price trends
- Recommends best deals via AI
- Saves your favorites
- Works completely offline
- Costs nothing to run

**Start using it today!** ✈️🌍

---

## 💬 Questions?

Check:
1. Console (F12) for errors
2. Backend logs for API issues
3. Browser storage for saved trips
4. `SETUP_AND_DEPLOYMENT.md` for general help

---

**Happy vacation planning!** 🎉✈️

Last updated: 2026-08-31
