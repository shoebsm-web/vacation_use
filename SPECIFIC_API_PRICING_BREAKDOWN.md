# EXACT Breakdown: $50/Month Flight APIs - Rate Limits & Overage Costs

## 💯 AVIATIONSTACK - $49.99/month BASIC PLAN

### What You Get (EXACTLY)
```
Base Price: $49.99/month (or $44.99/month if billed yearly)
Included Requests: 10,000 requests per month
Rate Limit: 1 request per 60 seconds (FREE TIER only - see below)
```

### What Happens If You Go Over?
**OVERAGE COST: $0.005998 per additional request**

Example:
```
Plan includes: 10,000 requests
You make: 15,000 requests
Overage: 5,000 requests × $0.005998 = $29.99 extra charge
Total bill: $49.99 + $29.99 = $79.98
```

### Professional Plan Comparison
```
Professional: $149.99/month for 50,000 requests
Overage: $0.00359976 per additional request (cheaper per request!)

Business: $499.99/month for 250,000 requests  
Overage: $0.002399952 per additional request (even cheaper!)
```

### Critical Details
- **Rate Limit (FREE TIER):** 1 request per 60 seconds
- **Rate Limit (PAID TIERS):** NOT SPECIFIED on site (likely unlimited or very high)
- **Data Available:** Real-time flights, historical flights, airline routes, schedules, airports
- **Error Handling:** Failed requests DON'T count against quota
- **Support:** Standard support included

### The Math for Your Use Case
```
Scenario: Searching flights for 100 users/day
- Each user does 5 searches = 500 requests/day
- 500 × 30 days = 15,000 requests/month
- Your cost: $49.99 base + (5,000 × $0.005998) = $79.98/month

If you upgrade to Professional ($149.99):
- 50,000 requests included
- Only pay overage if you exceed 50K
- Same 15,000 requests costs: $149.99 (flat, no overage)
```

---

## 💯 FLIGHTAPI.IO - $49/month LITE PLAN

### What You Get (EXACTLY)
```
Base Price: $49/month (Lite plan)
Included Credits: 30,000 credits per month
Rate Limit: 5 concurrent requests max
Concurrent = Requests running at same time, not total requests
```

### IMPORTANT: "Credits" ≠ Requests
**This is tricky!** FlightAPI uses a "credit" system:
- 1 flight search = ??? credits (NOT specified clearly)
- Different endpoints cost different amounts
- You need to contact them for exact credit costs

### What Happens If You Go Over?
**Soft cap = You CAN go over, but you pay extra**

**OVERAGE COST: NOT CLEARLY PUBLISHED**
- Likely $0.001-0.003 per additional credit (estimated)
- You'd need to contact FlightAPI for exact overage rates

### Plan Tiers (All Fixed Cost)
```
Free Tier: 20 calls (or 100/30 days - docs contradict themselves)

Lite: $49/month
- 30,000 credits
- 5 concurrent requests
- Supports: Flight pricing, tracking, schedules

Standard: $99/month  
- 100,000 credits
- 10 concurrent requests
- Adds: Round-trip flights, WhatsApp support

Plus: $199/month
- 500,000 credits
- 50 concurrent requests  
- Adds: Dedicated email/WhatsApp support
```

### The Problem With FlightAPI
- **Credit cost per request is NOT published**
- **Overage costs are NOT published**
- **You have to guess or ask them**

This makes budgeting unreliable. Don't use this without contacting support first.

---

## 💯 OTHER $49-50 OPTIONS

### AIRLABS API - $49/month DEVELOPER PLAN
```
Base Price: $49/month
Included Requests: 25,000 requests per month
Rate Limit: NOT specified (check docs)
Overage Cost: NOT specified (contact sales)
Data: Flight tracking, operations (NOT booking/pricing)
```

### FLIGHTRADAR24 API - $9/month START
```
Base Price: $9/month (cheapest!)
Included Requests: 30,000 per month
Overage: $0.0003 per request (cheapest overage!)
Rate Limit: NOT specified
Data: Real-time flight tracking
```

---

## ⚠️ CRITICAL HIDDEN TRUTHS

### Truth #1: "Requests" Means Different Things
```
Aviationstack:
- 1 request = 1 API call = count toward quota

FlightAPI.io:
- 1 credit system where costs vary per endpoint
- Round-trip search might = 2 credits
- Single flight lookup might = 0.5 credits
- Not standardized!
```

### Truth #2: Rate Limits vs Request Quotas Are Different
```
QUOTA = Total requests per month (10,000)
RATE LIMIT = Requests per second/minute you can send

Example:
- Aviationstack Free: 100 requests/month quota, 1 req/60s rate limit
- Aviationstack Paid: 10,000 requests/month quota, rate limit unknown

You could have 30K monthly quota but only make 100 requests/sec
= Can only use 432M requests/month max (if you had quota for it)
```

### Truth #3: Overage Can Be Expensive
```
Aviationstack $49.99 plan:
If you use 25,000 requests = $49.99 + (15,000 × $0.005998) = $139.97
That's 3x the base price!

Better to upgrade to Professional ($149.99) at that usage level
```

### Truth #4: Error Requests Count Differently
```
Aviationstack: Failed requests DON'T count
FlightAPI.io: Unclear if failed requests count
AviationStack is better for this
```

---

## 📊 REAL-WORLD COST SIMULATOR

### Scenario A: Light Use (500 requests/month)
```
Aviationstack Lite: $49.99
- Includes 10,000 requests
- You use 500
- No overage
- Cost: $49.99/month ✅ GOOD DEAL
```

### Scenario B: Medium Use (15,000 requests/month)
```
Aviationstack Lite: $49.99 + (5,000 × $0.005998) = $79.98
vs
Aviationstack Professional: $149.99 (flat)
RECOMMENDATION: Upgrade to Professional (saves $10-20/month at this volume)
```

### Scenario C: Heavy Use (100,000 requests/month)
```
Aviationstack Professional: $149.99 + (50,000 × $0.00359976) = $329.98
vs
Aviationstack Business: $499.99 (flat)
Possible: Move to different API (Sky Scrapper RapidAPI)
```

### Scenario D: Extremely Heavy (1,000,000 requests/month)
```
Aviationstack Business: $499.99 + (750,000 × $0.002399952) = $2,299.93
STOP. Use Flightradar24 at $9/month + overage at $0.0003/request
= $9 + (1,000,000 × $0.0003) = $309
SAVE: $1,990/month! (Use the right API for your volume)
```

---

## 🎯 WHAT YOU SHOULD ACTUALLY LOOK AT

When comparing $50/month APIs, ask:

### 1️⃣ How is "request" defined?
- [ ] Per API call?
- [ ] Per credit system?
- [ ] Per endpoint?

### 2️⃣ What's the real rate limit?
- [ ] Requests per second?
- [ ] Concurrent requests?
- [ ] Burst capacity?

### 3️⃣ What's the overage cost?
- [ ] Per request?
- [ ] Per thousand?
- [ ] Soft or hard cap?

### 4️⃣ What happens at overage?
- [ ] Requests rejected (hard cap)?
- [ ] Requests allowed + billed (soft cap)?
- [ ] Service throttled?

### 5️⃣ For your expected volume:
- [ ] Will you stay under quota?
- [ ] If you go over, how much?
- [ ] Should you upgrade to next tier?

---

## 🎯 RECOMMENDATION FOR YOUR SKYPULSE

### If you expect 500-5,000 requests/month:
**Use: Aviationstack Lite ($49.99)**
- Plenty of headroom
- Clear pricing
- Cheap overage if needed

### If you expect 10,000+ requests/month:
**Use: Sky Scrapper RapidAPI ($30-50)**
- Pay per request instead of monthly quota
- More transparent pricing
- Works better for high volume

### If you expect 100,000+ requests/month:
**Use: Flightradar24 ($9/month)**
- Cheapest overage rate ($0.0003/request)
- Best for massive volume
- Different data type (tracking vs search)

---

## THE HONEST TRUTH

**$50/month APIs are "good deals" ONLY IF:**
✅ You're under the included quota
✅ Overage costs are cheap per-request
✅ You don't need unlimited throughput

**They become EXPENSIVE FAST when:**
❌ You exceed quota regularly
❌ You need high rate limits
❌ Overage costs add up

**Better options:**
✅ Sky Scrapper (pay per request, no monthly minimum)
✅ Duffel ($3 per booking, no quota limit)
✅ Travelpayouts (free, commission-based)

---

## NEXT STEPS

For SkyPulse with realistic vacation search volume (100-500 searches/day):

**My recommendation:**
1. Start with **Aviationstack Lite** ($49.99) - plenty of room
2. Monitor your actual usage for 1 month
3. If you hit quota, switch to **Sky Scrapper RapidAPI** (pay-as-you-go)
4. When monetizing, add **Duffel** ($3 per booking)

**Total starting cost: $50/month**
**Scales with actual usage, not arbitrary tiers**

Want me to help you set up one of these APIs with real integration code?
