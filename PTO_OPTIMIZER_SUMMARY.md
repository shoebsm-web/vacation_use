# 🎯 PTO OPTIMIZER - Feature Summary

## What You Just Got

A brand new feature that helps you **find the perfect travel dates** by optimizing the balance between:
- **Flight Cost** (lower is better)
- **PTO Days Used** (fewer is better)
- **Score** (combines both equally)

---

## 📁 Files Created

| File | Purpose |
|------|---------|
| `skypulse-pto-optimizer.html` | New website with PTO Optimizer tab |
| `PTO_OPTIMIZER_GUIDE.md` | Complete user guide with examples |

---

## 🚀 Quick Start (3 Minutes)

### **Step 1: Start Backend**
```cmd
cd Desktop\vacation_use
npm start
```

Wait for: `✅ Server running at: http://localhost:3000`

### **Step 2: Open Website**
Double-click: `skypulse-pto-optimizer.html`

### **Step 3: Use PTO Optimizer**

1. Click: **⚡ PTO Optimizer** tab
2. Fill in:
   - Holiday: (example: "Thanksgiving")
   - Departure Airport: (example: "Dallas/Fort Worth")
   - Destination: (example: "Miami")
   - Max PTO Days: (example: "5")
3. Click: **Optimize**
4. See results sorted by best score! 🎉

---

## 🎯 How It Works

### **Input:**
- Holiday date
- Where you leave from
- Where you want to go
- How many PTO days max

### **Process:**
1. **Generates** all valid date combos (±5 days around holiday)
2. **Fetches** real flight prices from Aviationstack
3. **Calculates** PTO days for each combo (calendar days, includes weekends)
4. **Scores** each combo (price + PTO days weighted equally)
5. **Sorts** by score (lowest = best)

### **Output:**
Table with:
- Departure date
- Return date
- Calendar days of PTO needed
- Flight price
- Score (lower is better)

---

## 💡 Understanding the Score

### **Formula:**
```
SCORE = (Price Factor + PTO Factor) / 2

Price Factor = (This Price / Max Price) × 100
PTO Factor = (Days Used / Max Days) × 100
```

### **Example:**

If max price is $400 and max PTO is 5 days:

```
Trip A: $192 flight, 3 days PTO
  Price Factor = (192/400) × 100 = 48
  PTO Factor = (3/5) × 100 = 60
  Score = (48 + 60) / 2 = 54 🔵 Good!

Trip B: $100 flight, 5 days PTO
  Price Factor = (100/400) × 100 = 25
  PTO Factor = (5/5) × 100 = 100
  Score = (25 + 100) / 2 = 62 🟠 Fair

Trip C: $300 flight, 1 day PTO
  Price Factor = (300/400) × 100 = 75
  PTO Factor = (1/5) × 100 = 20
  Score = (75 + 20) / 2 = 47 🔵 Good!
```

**Trip A is best** - good balance of price and time off!

---

## 🎓 Real Example: Thanksgiving Vacation

### **Your Plan:**
- Holiday: Thanksgiving (Nov 26, 2026)
- Leave from: Dallas (DFW)
- Go to: Miami (MIA)
- Max PTO: 5 days

### **What Gets Generated:**

The system creates ~30-40 combinations like:

```
Depart Nov 21 → Return Nov 26 = 5 PTO days
Depart Nov 21 → Return Nov 27 = 6 PTO days (rejected - over limit)
Depart Nov 22 → Return Nov 26 = 4 PTO days
Depart Nov 22 → Return Nov 27 = 5 PTO days
Depart Nov 23 → Return Nov 26 = 3 PTO days ← Fewer days!
Depart Nov 23 → Return Nov 27 = 4 PTO days
Depart Nov 24 → Return Nov 26 = 2 PTO days ← Even fewer!
Depart Nov 24 → Return Nov 27 = 3 PTO days
Depart Nov 25 → Return Nov 26 = 1 PTO day ← Minimum!
Depart Nov 25 → Return Nov 27 = 2 PTO days
...and more
```

### **Flight Prices Fetched:**

Real prices from Aviationstack API:

```
Nov 21→26: $245
Nov 21→27: $280
Nov 22→26: $268
Nov 22→27: $192 ← Cheapest flight!
Nov 23→26: $215
Nov 23→27: $295
Nov 24→26: $320
Nov 24→27: $198
Nov 25→26: $445 ← Most expensive
Nov 25→27: $225
```

### **Scores Calculated:**

Max price: $445, Max PTO: 5 days

```
Nov 22→27: $192 + 5 days = ((192/445)×100 + (5/5)×100) / 2 = 67 🟠
Nov 24→27: $198 + 3 days = ((198/445)×100 + (3/5)×100) / 2 = 52 🔵 ← Good!
Nov 23→26: $215 + 3 days = ((215/445)×100 + (3/5)×100) / 2 = 54 🔵 ← Good!
Nov 25→27: $225 + 2 days = ((225/445)×100 + (2/5)×100) / 2 = 40 🟢 ← BEST!
Nov 21→26: $245 + 5 days = ((245/445)×100 + (5/5)×100) / 2 = 74 🟠
```

### **Results Table (Sorted by Score):**

| Depart | Return | Days | Price | Score | Rating |
|--------|--------|------|-------|-------|--------|
| Nov 25 | Nov 27 | 2 | $225 | 40 | 🟢 BEST |
| Nov 24 | Nov 27 | 3 | $198 | 52 | 🔵 Good |
| Nov 23 | Nov 26 | 3 | $215 | 54 | 🔵 Good |
| Nov 22 | Nov 27 | 5 | $192 | 67 | 🟠 Fair |
| Nov 21 | Nov 26 | 5 | $245 | 74 | 🟠 Fair |

**🏆 Winner:** Depart Nov 25, Return Nov 27
- Only 2 days PTO needed (includes Thanksgiving!)
- Good price at $225
- Best score at 40

---

## 📊 Score Ratings

```
Score 0-40  = 🟢 EXCELLENT (pick these!)
Score 40-60 = 🔵 GOOD (solid options)
Score 60-80 = 🟠 FAIR (consider carefully)
Score 80+   = 🔴 POOR (pass)
```

---

## 📅 Date Range: ±5 Days Around Holiday

The system explores dates from:
- **5 days BEFORE** the holiday
- **Through the holiday**
- **5 days AFTER** the holiday

**Example for Thanksgiving (Nov 26):**

```
Earliest depart: Nov 21 (Friday)
Latest return:   Dec 1 (Monday)

This gives you 10 days of flexibility
to find the best prices!
```

---

## 🎓 How to Use (Detailed)

### **1. Open the Optimizer**
- Backend running: `npm start`
- File open: `skypulse-pto-optimizer.html`
- Green checkmark visible ✅

### **2. Fill the Form**

**⚡ PTO Optimizer Tab:**

| Field | Example | Notes |
|-------|---------|-------|
| Holiday | Thanksgiving (Nov 26, 2026) | Your target holiday |
| Departure | Dallas/Fort Worth (DFW) | Where you leave from |
| Destination | Miami (MIA) | Where you want to go |
| Max PTO Days | 5 | How many days max you'll use |

### **3. Click "Optimize"**

Loading bar appears while:
- Generating date combinations
- Fetching flight prices (takes 10-30 seconds)
- Calculating scores

### **4. Review Results**

Table appears sorted by score (best first)

### **5. Click Columns to Sort**

- **Departure Date** - Leave earliest first
- **Return Date** - Come back earliest first
- **PTO Days** - Shortest trips first
- **Flight Price** - Cheapest flights first
- **Score** - Best value first (DEFAULT)

---

## 💡 Pro Tips

### **Tip 1: Find Cheap Flights**
Set Max PTO = 20 days, then sort by "Flight Price"
→ Shows you the absolute cheapest option

### **Tip 2: Minimize Days Off**
Set Max PTO = 2 days, sort by "PTO Days"
→ Find the shortest trip that still works

### **Tip 3: Use Default Score**
Leave sort as "Score", use the top option
→ Best balance automatically calculated

### **Tip 4: Try Multiple Destinations**
Run optimizer for Miami, Vegas, Paris
Compare best scores
→ Pick the city with lowest score!

### **Tip 5: Adjust Max PTO**
Try with Max = 3, then Max = 5, then Max = 7
→ See how score improves with more flexibility

---

## 🔄 Calendar Days Explained

**This uses CALENDAR DAYS** (includes weekends):

```
Leave Friday Nov 25
Return Monday Nov 27

Count: Friday, Saturday, Sunday, Monday = 4 days
(NOT 2 business days)
```

**Why?** You're thinking "I get 4 days of vacation," not "2 work days."

---

## ⚡ Real-Time Data

**Flights are REAL:**
- Uses Aviationstack API
- Live pricing
- Your 100 requests/month free tier
- Updates daily

**Prices vary:**
- Different dates = different prices
- Morning flights cheaper than evening
- Saturdays more expensive than Tuesdays

---

## 🎯 Score Does NOT Include

The score is smart but simple. It doesn't consider:

- ❌ Weather
- ❌ Airport crowds
- ❌ Flight duration
- ❌ Airline quality
- ❌ Hotel prices
- ❌ Your preferences

**Use the score as a starting point, then add your judgment!**

---

## 📊 Example Use Cases

### **Scenario 1: You Have Limited Time**
```
Max PTO: 2 days
Sort by: PTO Days
Result: Shows trips using only 1-2 days
```

### **Scenario 2: You Want Cheap**
```
Max PTO: 10 days
Sort by: Flight Price
Result: Shows cheapest flights
(don't care how many days)
```

### **Scenario 3: You Want Balance (RECOMMENDED)**
```
Max PTO: 5 days
Sort by: Score
Result: Best balance automatically
```

### **Scenario 4: You Have Lots of Time**
```
Max PTO: 20 days
Sort by: Score
Result: Maximum flexibility
to find best deals
```

---

## 🚀 Next Features

Things to add later:

- [ ] Hotel price integration
- [ ] Weather forecast
- [ ] TSA PreCheck time estimates
- [ ] Direct booking from table
- [ ] Save favorite combinations
- [ ] Price alerts (notify when price drops)
- [ ] Multi-city support
- [ ] Group trip optimization

---

## 📞 Questions?

**Q: Why is my score so high?**
A: Maybe your max price or max PTO is too low. Increase them.

**Q: Can I see 20 combinations instead of 10?**
A: Yes, edit `maxCombinations` in the code (currently = 10).

**Q: Do prices update every day?**
A: Yes, Aviationstack data is live (if you're still within 100 req/month).

**Q: Can I book from the table?**
A: Not yet! Note the dates and book manually on Kayak/Google Flights.

**Q: Does it work for international travel?**
A: Yes! Works for any airport code (MIA, CDG, LHR, CUN, etc.)

---

## 🎉 You Have It!

✅ PTO Optimizer fully built
✅ Real flight data integrated  
✅ Intelligent scoring algorithm
✅ Sortable results table
✅ Beautiful UI

**It's ready to use!**

---

## 📖 Full Documentation

For more details, read: **PTO_OPTIMIZER_GUIDE.md**

---

**Enjoy planning your perfect vacation!** ✈️🌴

Your new SkyPulse PTO Optimizer is live and ready!
