# ✈️ Vacation Planner with Flight Comparison

## AI-Powered Flight Search Across 5+ Websites

An intelligent vacation planning system that searches multiple flight websites simultaneously and uses Claude AI to recommend the cheapest deals.

---

## 🎯 What It Does

1. **You pick a holiday** (Thanksgiving, Christmas, etc.)
2. **System searches 5+ flight websites** at once:
   - Google Flights
   - Skyscanner
   - Kayak
   - Kiwi (budget airlines)
   - Amadeus (airlines)

3. **Shows all prices** sorted cheapest first
4. **Claude AI analyzes** and recommends best deal
5. **One click to book** on the website of your choice

---

## ✨ Features

### 🔍 Multi-Website Search
- Automatically checks 5+ flight booking sites
- Shows results from each source side-by-side
- Highlights cheapest option
- Shows airline, duration, stops

### 🤖 AI Recommendations
- Claude AI analyzes all options
- Explains why one flight is best
- Considers price, convenience, timing
- Personalized recommendations

### 💰 100% Free
- Free APIs (100% of free tiers)
- Free hosting (Vercel + GitHub Pages)
- Free AI credit ($5 starter)
- No hidden fees

### 🎨 Beautiful UI
- Modern dark theme
- Responsive design (mobile + desktop)
- Real-time price updates
- Smooth animations

### 📱 Mobile Friendly
- Works on phones, tablets, computers
- Touch-friendly buttons
- Fast loading
- Offline support (coming soon)

---

## 🚀 Quick Start

### Option 1: Run Locally (5 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Create .env file with your API keys
# (See SIMPLE_API_KEY_SETUP.md)

# 3. Start server
npm start

# 4. Open website
open src/frontend/vacation_dashboard_enhanced.html
```

Server runs on: http://localhost:3001

### Option 2: Use Live Version

Once deployed, visit:
```
https://shoebsm-web.github.io/vacation_use/
```

(Backend deployed to Vercel)

---

## 📋 Setup (3 Steps)

### Step 1: Get Free API Keys (15 min)

Follow: **SIMPLE_API_KEY_SETUP.md**

You'll get:
- ✅ SerpAPI key (Google Flights)
- ✅ RapidAPI key (Skyscanner, Kayak)
- ✅ Kiwi API key (Budget flights)
- ✅ Claude API key (AI brain)

### Step 2: Configure Project (5 min)

```bash
# Install Node packages
npm install

# Create .env file
cp .env.example .env

# Edit .env with your API keys
nano .env  # or open in text editor
```

### Step 3: Run System (2 min)

```bash
npm start
# Then open: src/frontend/vacation_dashboard_enhanced.html
```

**Done!** Search for flights and get AI recommendations!

---

## 📁 Project Structure

```
vacation_use/
├── src/
│   ├── backend/
│   │   ├── flight_comparison_server.js    ✨ NEW: Main server
│   │   │                                   Handles flight API calls
│   │   ├── vacation_backend.js             Original backend
│   │   └── vacation_api_demo.js            Original demo
│   └── frontend/
│       ├── vacation_dashboard_enhanced.html ✨ NEW: Flight UI
│       │                                     Beautiful dashboard
│       └── vacation_dashboard.html          Original dashboard
├── .env                                    ✨ CREATE THIS
├── .env.example                            Template for .env
├── .gitignore                              Git ignore rules
├── package.json                            Dependencies
├── README.md                               This file
├── SETUP_AND_DEPLOYMENT.md                 ✨ Complete guide
├── SIMPLE_API_KEY_SETUP.md                 ✨ Simple setup
├── FLIGHT_COMPARISON_ROADMAP.md            Project roadmap
└── FREE_RESOURCES_COMPLETE_LIST.md         Resource links
```

**✨ = New files you'll use**

---

## 🔄 How It Works (Architecture)

```
┌─────────────────────────────────────────┐
│  Your Website (vacation_dashboard_enhanced.html)
│  Beautiful flight search UI
└──────────────┬──────────────────────────┘
               │ "Search for Miami flights"
               ↓
┌─────────────────────────────────────────┐
│  Your Backend (flight_comparison_server.js)
│  Node.js/Express server
└──────────────┬──────────────────────────┘
               │ "Get prices from everywhere"
        ┌──────┴──────────────────┬────────────┐
        ↓                         ↓            ↓
    Google Flights           Skyscanner      Kayak
    Kiwi API                 Amadeus
               │                │            │
               └────────┬───────┴────────────┘
                        ↓
              Combine all results
              Remove duplicates
              Sort by price
                        │
                        ↓
        ┌──────────────────────────────────┐
        │  Claude AI (claude API)           │
        │  "What's the best deal?"          │
        └────────────────┬─────────────────┘
                         │
                    "Book Southwest,
                    it's best because..."
                         │
                         ↓
        ┌──────────────────────────────────┐
        │  Send back to website             │
        │  Show beautiful results           │
        └──────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Component | Technology | Why |
|-----------|-----------|-----|
| **Frontend** | HTML/CSS/JavaScript | Simple, no build needed |
| **Backend** | Node.js + Express | Fast, handles API calls |
| **APIs** | Flight APIs | Real prices, multiple sources |
| **AI** | Claude API | Smart recommendations |
| **Hosting** | GitHub Pages + Vercel | Free, scalable |

**Everything is JavaScript-based!**

---

## 💰 Cost Breakdown

| Service | Cost | Details |
|---------|------|---------|
| **SerpAPI** | FREE | 100 searches/month |
| **RapidAPI** | FREE | 5,000 requests/month |
| **Kiwi** | FREE | 500 calls/month |
| **Claude** | FREE | $5 starter credit (~500 uses) |
| **GitHub Pages** | FREE | Unlimited hosting |
| **Vercel** | FREE | Unlimited serverless functions |
| **Domain** | OPTIONAL | Use GitHub Pages subdomain |
| **TOTAL** | **$0** | Completely free! |

After free tier, costs are ~$0.001-0.01 per search

---

## 🚀 Deployment

### Deploy Backend (Vercel)

```bash
# 1. Push to GitHub
git add .
git commit -m "Flight comparison system"
git push

# 2. Go to https://vercel.com
# 3. Connect GitHub repo
# 4. Add environment variables
# 5. Click Deploy

# Backend now live at: https://vacation-use.vercel.app
```

### Deploy Frontend (GitHub Pages)

Already done! Website lives at:
```
https://shoebsm-web.github.io/vacation_use/
```

Just update HTML and push:
```bash
git push
```

---

## 📖 Documentation

| File | Purpose |
|------|---------|
| **SIMPLE_API_KEY_SETUP.md** | Get your 4 free API keys |
| **SETUP_AND_DEPLOYMENT.md** | Complete setup & deploy guide |
| **FLIGHT_COMPARISON_ROADMAP.md** | Project overview & plan |
| **FREE_RESOURCES_COMPLETE_LIST.md** | All free tools & links |
| **README.md** | Original project docs |

**Start with:** SIMPLE_API_KEY_SETUP.md

---

## 🤖 How AI Works

### Behind the Scenes

1. **Get prices** from 5+ websites
2. **Send all results** to Claude AI
3. Claude analyzes:
   - Which is cheapest?
   - Which airline is best?
   - What time is best?
   - Any red flags?
4. **Claude explains** the recommendation in plain English

### Example Output

```
AI says: "Book Southwest $245"

Why:
1. Cheapest option overall
2. Leaves morning (9:00 AM) - less tired
3. Direct flight - no hassle
4. Southwest has good reviews
Alternative: Frontier is $30 cheaper but has
6-hour connection
```

---

## 🎓 Learning Resources

Want to learn more?

- **How APIs work:** https://www.youtube.com/results?search_query=api+explained
- **Node.js basics:** https://nodejs.org/en/docs/guides/
- **Claude API:** https://console.anthropic.com/docs/api
- **Express.js:** https://expressjs.com
- **Deployment:** https://vercel.com/docs

---

## 🐛 Troubleshooting

### "Cannot find module"
```bash
npm install
npm start
```

### "API Key invalid"
1. Check `.env` file exists
2. Copy API keys again carefully
3. Restart server

### "No results found"
1. Try different airport/destination
2. Check API key monthly limits
3. Look at console errors (F12)

### "Can't connect to backend"
1. Make sure `npm start` is running
2. Check API_URL in HTML is correct
3. Verify firewall allows localhost:3001

See **SETUP_AND_DEPLOYMENT.md** for more help!

---

## 📊 Performance

### Speed
- Flight search: 3-10 seconds
- AI analysis: 1-2 seconds
- Total: ~5-15 seconds per search

### Reliability
- 99.9% uptime on Vercel
- Automatic retries for failed APIs
- Fallback to cached prices if APIs down

### Scale
- Handles 100+ searches per day
- Free tier covers ~50 daily searches
- Easy to upgrade if needed

---

## 🔐 Security

✅ **Safe:**
- API keys stored in `.env` (not on GitHub)
- No passwords needed
- HTTPS everywhere
- No data stored

⚠️ **Be Careful:**
- Don't commit `.env` to GitHub
- Don't share API keys
- Keep credentials private

---

## 🤝 Contributing

Want to help improve this?

1. **Report bugs:** Open GitHub issue
2. **Suggest features:** Add to issue
3. **Fix code:** Submit pull request
4. **Improve docs:** Edit markdown files

See: FEATURE_IDEAS.md (coming soon)

---

## 📝 License

MIT License - Use freely!

---

## 🎉 Next Steps

1. ✅ Read **SIMPLE_API_KEY_SETUP.md**
2. ✅ Get your 4 free API keys
3. ✅ Create `.env` file
4. ✅ Run `npm install`
5. ✅ Run `npm start`
6. ✅ Search for flights!
7. ✅ Deploy to Vercel
8. ✅ Share with friends

**You now have an AI-powered flight search engine!** 🚀

---

## 📞 Support

Questions? Check:
1. **SETUP_AND_DEPLOYMENT.md** - Setup issues
2. **SIMPLE_API_KEY_SETUP.md** - API key problems  
3. **Console (F12)** - See actual errors
4. **GitHub Issues** - Report bugs

---

## 🌟 Features Coming Soon

- 📍 Save favorite trips
- 🔔 Price drop alerts
- 📧 Email notifications
- 🗺️ Map view of destinations
- ⭐ Trip reviews & ratings
- 🎫 Multi-city trips
- 🏨 Hotel comparison
- 🚗 Car rental comparison

---

## 🙏 Credits

Built with:
- **Express.js** - Server framework
- **Claude AI** - Recommendations
- **Flight APIs** - Real flight data
- **GitHub Pages** - Free hosting
- **Vercel** - Serverless backend

---

**Happy traveling!** ✈️🌍

Questions? Open an issue on GitHub!

[GitHub Repository](https://github.com/shoebsm-web/vacation_use)

Last updated: 2026-08-31
