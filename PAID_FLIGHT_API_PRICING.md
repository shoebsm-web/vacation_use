# Paid Flight API Pricing - Complete Guide 2024-2026

## 💰 Pricing Spectrum

There are **three tiers** of paid flight APIs:

---

## TIER 1: AFFORDABLE/INDIE TIER ($50-$500/month)

### ✅ **Duffel** (RECOMMENDED FOR BOOKING)
**Best for:** Actual bookings with real airlines

**Pricing Model:**
- **$3 per confirmed flight order** (only pay when someone books)
- **1% of order value** for managed content
- **$1 per paid ancillary** (seat selection, baggage, etc.)
- **$0.005 per search** (after you hit 1,500:1 search-to-book ratio)
- Test mode: **FREE** (uses sandbox data)

**Example Cost:**
```
Search (free) → User searches flights
Search (free) → User filters options
Order ($3) → User books $250 flight = $3 + $2.50 = $5.50 total
```

**Real Volume Estimate:**
- 1,000 searches → ~$5-10 (only pay for bookings)
- 100 bookings → ~$350-500 per month

**Website:** https://www.duffel.com/

---

### ✅ **Aviationstack** (STATUS/SCHEDULE API)
**Best for:** Flight status, schedules, airlines (NOT PRICING)

**Pricing Model:**
- **Basic:** $49.99/month = 10,000 requests
- **Professional:** $149.99/month = 50,000 requests  
- **Business:** $499.99/month = 250,000 requests
- Free tier: **100 requests/month**

**Pros:**
- Low cost
- Self-serve signup
- Real data

**Cons:**
- Limited to status/schedules (no booking)
- Can't search prices

**Website:** https://aviationstack.com/

---

### ✅ **FlightAPI.io**
**Best for:** Budget searchers

**Pricing Model:**
- **Free:** 100 requests/30 days
- **Lite:** $49/month = 30K requests
- **Standard:** $99/month = 100K requests
- **Plus:** $199/month = 500K requests

**Per-Request Cost:**
- Lite: $0.0016/request
- Standard: $0.001/request  
- Plus: $0.0004/request

**Website:** https://flightapi.io/

---

### ✅ **FlightAware AeroAPI** (TRACKING ONLY)
**Best for:** Flight status, delays, tracking

**Pricing Model:**
- **Personal:** $5/month (limited credits)
- **Standard:** $200/month minimum (5 result sets/second)
- **Premium:** Higher volume (100 result sets/second)

**Note:** This is NOT for price searching, only tracking/status

**Website:** https://flightaware.com/commercial/aeroapi/

---

### ✅ **Travelpayouts** (AFFILIATE MODEL)
**Best for:** Affiliate commissions on bookings

**Pricing Model:**
- Free API access + Commission on bookings
- Requires: 50,000+ MAU (monthly active users)
- You get paid when users book through your link

**Example:**
```
100 users find flights → Some click "Book"
→ Booked flight $300 → You get ~$10-30 commission
→ Multiple bookings = passive income
```

**Pros:**
- FREE API access for affiliates
- Get paid for traffic

**Cons:**
- Need audience size
- Commission-based only

**Website:** https://www.travelpayouts.com/

---

## TIER 2: ENTERPRISE TIER ($5,000-$30,000+/setup)

### ❌ **Kiwi.com Tequila** (CLOSED TO NEW DEVS)
**Status:** Invitation-only partnerships only since May 2024

**Pricing (if you get approved):**
- **Setup:** $0-30,000
- **Model:** Revenue share or per-booking fees
- Actual terms: **Negotiated case-by-case**

**Reality:**
- New developers cannot sign up
- Existing partners kept access
- Would need 50K+ MAU through Travelpayouts route

---

### ❌ **Skyscanner (Official)** 
**Status:** Partner-only

**Pricing (if approved):**
- Requires: $100K+/year minimum (estimated)
- Model: Revenue share
- Approval: 2+ week review process
- Not guaranteed for new partners

**Requirements:**
- Established travel business
- Significant audience
- Commercial agreement

---

## TIER 3: LEGACY GDS ENTERPRISE ($50,000-$200,000+/year)

### ❌ **Amadeus** (ENTERPRISE ONLY - SHUT DOWN SELF-SERVICE JULY 2026)
**Status:** CLOSED to indie developers

**Pricing (Enterprise only):**
- **Setup:** $1,000-$9,000
- **Monthly:** $6,000-$50,000+ (negotiated)
- **Per-transaction fees:** Variable
- **Look-to-book ratio charge:** Extra fees based on search-to-booking rate

**Example Cost:**
```
Setup: $5,000
Monthly: $10,000
Transaction fees: Varies
Annual: $125,000+
```

**Who Can Get It:**
- Travel agencies
- OTAs (Online Travel Agencies)
- Companies with existing GDS relationships
- IATA/ARC accreditation

---

### ❌ **Sabre, Travelport** (Similar to Amadeus)
**Pricing:**
- $50,000-$200,000+ annually
- Enterprise contracts only
- Per-segment/transaction fees

---

## 📊 PRICING COMPARISON TABLE

| API | Free Tier | Starting Price | Per-Request | Best For | Accessibility |
|-----|-----------|-----------------|------------|----------|---|
| **Duffel** | ✅ Sandbox | $3/booking | $0.005-3 | Real bookings | ✅ Easy |
| **Aviationstack** | ✅ 100/mo | $49.99/mo | $0.0050 | Status/schedules | ✅ Easy |
| **FlightAPI.io** | ✅ 100/mo | $49/mo | $0.001-4 | Search | ✅ Easy |
| **Travelpayouts** | ✅ FREE | Commission | $0 API | Affiliate | ✅ Easy |
| **FlightAware** | ✅ $5/mo | $200/mo | Variable | Tracking | ✅ Easy |
| **Kiwi.com** | ❌ | $0-30K | Negotiated | Flexible routes | ❌ Closed |
| **Skyscanner** | ❌ | $100K+ est | Negotiated | Metasearch | ❌ Closed |
| **Amadeus** | ❌ | $1-9K setup | $6-50K/mo | Full booking | ❌ Closed |

---

## 🎯 WHICH SHOULD YOU CHOOSE?

### **For Your SkyPulse Project:**

#### **Option 1: BUDGET ($0-100/month)**
Use combination:
1. **Duffel (Sandbox)** - FREE testing
2. **Sky Scrapper (RapidAPI)** - ~$20-50/mo for moderate use
3. **Travelpayouts** - FREE if you have audience

**Total:** ~$50/month for real data

---

#### **Option 2: SERIOUS BOOKING ($200-500/month)**
Use:
1. **Duffel** - Pay per booking (most economical)
2. **Aviationstack** ($49.99) - For flight status
3. **Sky Scrapper** - Search fallback

**Total:** Variable + $49.99 base

**Example with 200 bookings/month:**
- Duffel: 200 × $3 = $600
- Aviationstack: $49.99
- **Total: ~$650/month**

---

#### **Option 3: MONETIZED (Revenue Share)**
Use:
1. **Travelpayouts** - FREE + commissions
2. **Duffel** - Real bookings

**Total:** FREE, get paid per booking

**Example with 500 bookings/month:**
- Travelpayouts commission: ~$3,000-5,000
- **You earn money instead of spending it**

---

## 💡 REAL-WORLD COST ESTIMATE FOR YOUR USE CASE

**Your SkyPulse vacation planner with 1,000 monthly users:**

### Scenario A: Development Only (Mock Data)
- Cost: **$0**
- Use: Sky Scrapper free tier + Duffel sandbox

### Scenario B: Small Production (100 bookings/month)
- Sky Scrapper: $30-50
- Duffel: 100 × $3 = $300
- **Total: ~$330-350/month**

### Scenario C: Medium Scale (500 bookings/month)
- Sky Scrapper: $50 (upgraded)
- Duffel: 500 × $3 = $1,500
- Aviationstack: $50
- **Total: ~$1,600/month**

### Scenario D: Affiliate Model (Getting Paid)
- Travelpayouts: FREE API
- Commission from bookings: $1,500-3,000/month
- **Total: You earn $1,500-3,000**

---

## ⚠️ HIDDEN COSTS NOT LISTED

When budgeting, also consider:

1. **Backend server hosting:** $50-500/month
2. **Database:** $20-100/month  
3. **SSL certificate:** $0 (free with Let's Encrypt)
4. **API monitoring/uptime:** $0-50/month
5. **Support/documentation:** Included in paid APIs

---

## 🚀 RECOMMENDATION FOR YOUR PROJECT

**Start here:**

1. ✅ **Use Duffel (FREE sandbox)** for development
2. ✅ **Use Sky Scrapper (RapidAPI)** for search (~$30-50/mo)
3. ✅ **Deploy with Duffel** when ready for bookings ($3 per booking)

**Total for first month:** ~$50
**Sustainable model:** $3 per completed booking

This is the **lowest cost, highest capability** approach for your vacation planner. 🎯

---

## Next Steps

Want me to:
1. Show how to integrate **Duffel API** into your backend?
2. Set up **Sky Scrapper** calls properly?
3. Build a **Node.js backend** with both APIs?
4. Handle **payment/billing** for bookings?

Let me know! 🚀
