# 🎯 PTO OPTIMIZER - Complete Guide

## What is PTO Optimizer?

**PTO Optimizer** helps you find the **best travel dates** around a company holiday by balancing:
- ✅ **Flight cost** (lower is better)
- ✅ **PTO days used** (fewer is better)
- ✅ **Score** (combines both factors equally)

---

## 📋 How It Works

### **Input:**
1. **Holiday** - Pick a company holiday (Thanksgiving, Christmas, etc.)
2. **Departure Airport** - Where you leave from (your home airport)
3. **Destination** - Where you want to go
4. **Max PTO Days** - How many vacation days you're willing to use (1-20 days)

### **Process:**
1. **Generates** all valid travel date combinations within **±5 days of the holiday**
2. **Fetches** real flight prices for each combination from Aviationstack API
3. **Calculates** calendar days used (including weekends)
4. **Scores** each combination (balanced: price and PTO days matter equally)
5. **Displays** results in a sortable table, sorted by best score first

### **Output:**
A table showing:
- Departure date
- Return date
- PTO days used
- Flight price
- Score (lower = better)

---

## 🎯 Understanding the Score

### **How Scoring Works:**

**The score balances two factors equally:**

```
SCORE = (Price Factor + PTO Factor) / 2
```

**Price Factor:** What percentage of the max price this flight costs
- Low price = low score = good ✅
- High price = high score = bad ❌

**PTO Factor:** What percentage of your max PTO days this trip uses
- Few days = low score = good ✅
- Many days = high score = bad ❌

### **Example:**

If you're willing to use **5 PTO days max**:

| Scenario | Details | Score | Rating |
|----------|---------|-------|--------|
| **A** | Flight: $200, Uses 2 days | 32 | 🟢 Excellent |
| **B** | Flight: $400, Uses 1 day | 50 | 🔵 Good |
| **C** | Flight: $600, Uses 5 days | 100 | 🔴 Poor |

**Scenario A wins** because it balances cost and PTO days well.

---

## 📊 Score Ratings

```
Score < 40  = 🟢 Excellent (best options)
Score 40-60 = 🔵 Good
Score 60-80 = 🟠 Fair
Score > 80  = 🔴 Poor
```

---

## 🎯 Example Walkthrough

### **Scenario: Thanksgiving Vacation**

**Your inputs:**
- Holiday: Thanksgiving (Nov 26, 2026)
- Departure: Dallas (DFW)
- Destination: Miami (MIA)
- Max PTO: 5 days

### **What gets generated:**

The system creates combinations like:

```
Depart Nov 21 (Fri)  → Return Nov 26 (Wed) = 5 PTO days
Depart Nov 22 (Sat)  → Return Nov 26 (Wed) = 4 PTO days
Depart Nov 23 (Sun)  → Return Nov 26 (Wed) = 3 PTO days
Depart Nov 24 (Mon)  → Return Nov 26 (Wed) = 2 PTO days
Depart Nov 25 (Tue)  → Return Nov 26 (Wed) = 1 PTO day
Depart Nov 25 (Tue)  → Return Nov 27 (Thu) = 2 PTO days
Depart Nov 25 (Tue)  → Return Nov 28 (Fri) = 3 PTO days
... and more combinations
```

**Total:** ~30-40 combinations explored

### **Flight prices fetched:**

For each combination, the system calls Aviationstack API and gets the cheapest flights:

```
Nov 21→26: $245
Nov 22→26: $268
Nov 23→26: $192  ← Cheapest!
Nov 24→26: $320
Nov 25→26: $215
...
```

### **Scores calculated:**

Assuming max price is $320 and max PTO is 5 days:

```
Nov 23→26 (3 days, $192) = ((192/320)*100 + (3/5)*100) / 2 = 39 🟢 EXCELLENT
Nov 25→26 (1 day, $215)  = ((215/320)*100 + (1/5)*100) / 2 = 43 🔵 GOOD
Nov 21→26 (5 days, $245) = ((245/320)*100 + (5/5)*100) / 2 = 60 🟠 FAIR
Nov 24→26 (2 days, $320) = ((320/320)*100 + (2/5)*100) / 2 = 70 🟠 FAIR
```

### **Result displayed:**

Table sorted by score (best first):

| Departure | Return | PTO Days | Price | Score |
|-----------|--------|----------|-------|-------|
| Nov 23 | Nov 26 | 3 | $192 | 39 🟢 BEST |
| Nov 25 | Nov 26 | 1 | $215 | 43 🔵 |
| Nov 21 | Nov 26 | 5 | $245 | 60 🟠 |
| Nov 24 | Nov 26 | 2 | $320 | 70 🟠 |

**Recommendation:** Depart Nov 23, return Nov 26 - saves $50 compared to the super cheap 1-day trip and takes 3 days instead of 1, but the score is better because you get more vacation time!

---

## 📅 Calendar Days vs Business Days

**This optimizer uses CALENDAR DAYS** (includes weekends):

```
If you leave Friday and return Monday:
- Calendar days: 3 days (Fri, Sat, Sun, Mon)
- Business days: 1 day (only Friday counts)

This optimizer counts: 3 days
```

**Why?** Because when planning vacation, you care about actual time off, not just workdays!

---

## 🔄 Date Range: ±5 Days Around Holiday

**Why ±5 days?**

This gives you **maximum flexibility** to find the best deals while staying close to the company holiday.

**Example for Thanksgiving (Nov 26):**

```
5 days BEFORE:   Nov 21 (Fri)
4 days BEFORE:   Nov 22 (Sat)
3 days BEFORE:   Nov 23 (Sun)
2 days BEFORE:   Nov 24 (Mon)
1 day BEFORE:    Nov 25 (Tue)

THE HOLIDAY:     Nov 26 (Wed)  ← Included

1 day AFTER:     Nov 27 (Thu)
2 days AFTER:    Nov 28 (Fri)
3 days AFTER:    Nov 29 (Sat)
4 days AFTER:    Nov 30 (Sun)
5 days AFTER:    Dec 1 (Mon)
```

You can depart anytime from Nov 21 - Nov 25 and return anytime from Nov 26 - Dec 1.

---

## 🎓 Using the Optimizer

### **Step 1: Open the App**
1. Start your backend: `npm start`
2. Open: `skypulse-pto-optimizer.html`
3. Look for green checkmark: "Connected to backend server ✅"

### **Step 2: Fill in the Form**

**⚡ PTO Optimizer tab:**
- Holiday: "Thanksgiving (Nov 26, 2026)"
- Departure Airport: "Dallas/Fort Worth (DFW)"
- Destination: "Miami (MIA)"
- Max PTO Days: "5"

### **Step 3: Click "Optimize"**

Wait 10-30 seconds while the system:
- Generates ~30-40 date combinations
- Fetches real flight prices
- Calculates scores
- Displays results

### **Step 4: Review Results**

Table shows best options first. Click column headers to sort by:
- Departure date
- Return date
- PTO days used
- Flight price
- Score

---

## 💡 Pro Tips

### **Tip 1: Use "Max PTO Days" Strategically**

```
If you set Max = 3 days:
→ Only shows trips using ≤3 days
→ Useful if you have limited vacation time

If you set Max = 10 days:
→ Shows all options ≤10 days
→ Better for finding opportunities
```

### **Tip 2: Lower Scores are Better**

```
Score 30-40 = Great! Go for it! ✅
Score 50-70 = Good options available
Score 80+   = Either expensive or uses lots of PTO
```

### **Tip 3: Sort by Different Columns**

Default is sorted by score, but click column headers to sort by:
- **Cheapest flights:** Click "Flight Price"
- **Shortest trips:** Click "PTO Days"
- **Earliest departure:** Click "Departure Date"

### **Tip 4: Try Different Destinations**

Use the tool for multiple destinations to compare:

```
Miami (MIA):    Best score = 35
Vegas (LAS):    Best score = 42
Paris (CDG):    Best score = 51
```

→ Miami is the winner!

---

## 📊 Real-World Examples

### **Example 1: Budget Traveler**

**Goal:** Save money, don't care about PTO

```
Set Max PTO = 20 days (the max)
Sort by: "Flight Price"
Pick: The absolute cheapest flight, regardless of days used
```

### **Example 2: Limited Time Off**

**Goal:** Take fewer days off, willing to pay more

```
Set Max PTO = 2 days (very limited)
Sort by: "PTO Days"
Pick: The option that uses the fewest days
```

### **Example 3: Balanced Approach**

**Goal:** Balance cost and time off (RECOMMENDED)

```
Set Max PTO = 5 days (reasonable)
Keep default sort: "Score"
Pick: Top option (it's already optimized!)
```

---

## 🔧 How It Calculates Score

**Behind the scenes:**

```javascript
// For each date combination:

priceNormalized = (flightPrice / maxPrice) * 100
ptoNormalized = (ptoUsed / maxPTODays) * 100
score = (priceNormalized + ptoNormalized) / 2

// Example:
// Flight: $192, Max price: $400, PTO used: 3, Max PTO: 5
// Price factor: (192/400)*100 = 48
// PTO factor: (3/5)*100 = 60
// Score: (48 + 60) / 2 = 54 (Good!)
```

---

## ❌ What Scores DON'T Include

The score **does NOT** consider:

- ❌ Weather (rainy in Miami in August)
- ❌ Crowds (Thanksgiving = busy airports)
- ❌ Hotels (only looks at flights)
- ❌ Airline quality (all airlines treated equally)
- ❌ Personal preferences (maybe you hate airports)
- ❌ Loyalty points (frequent flyer miles)

**Use the score as a starting point, then add your own judgment!**

---

## 🚀 Next Steps

### **To Use Right Now:**
1. Make sure backend is running: `npm start`
2. Open: `skypulse-pto-optimizer.html`
3. Fill in the form
4. Click "Optimize"
5. See your best options!

### **To Deploy Online:**
Currently runs locally only. To make it public:
1. Deploy backend to Vercel/Heroku
2. Update BACKEND_URL in HTML
3. Share the link publicly

### **To Add More Features:**
- Add hotel price fetching
- Add weather data
- Add TSA PreCheck time estimates
- Add luggage fee comparison

---

## 📞 Questions?

**Q: Why is my best option showing a high score?**
A: Maybe your max PTO or max price is too low. Try increasing them.

**Q: Can I see more than 10 combinations?**
A: Currently limited to 10 for speed. Can be increased if you want to wait longer.

**Q: Do prices update in real-time?**
A: Yes! Aviationstack data is live (100 requests/month free tier).

**Q: Can I book directly from the table?**
A: Not yet, but coming soon! For now, note the dates and book manually.

---

## 🎉 You're Ready!

The PTO Optimizer is ready to help you find the **perfect balance** of cheap flights and reasonable vacation time.

**Enjoy planning your next trip!** ✈️🌴
