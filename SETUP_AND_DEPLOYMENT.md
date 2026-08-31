# 🚀 Complete Setup & Deployment Guide
## Flight Comparison Vacation Planner

---

## 📋 Table of Contents
1. [Quick Start (5 minutes)](#quick-start)
2. [Get API Keys (15 minutes)](#get-api-keys)
3. [Run Locally (10 minutes)](#run-locally)
4. [Deploy to Cloud (20 minutes)](#deploy-to-cloud)
5. [Troubleshooting](#troubleshooting)

---

## Quick Start

### What You'll Have After Setup
- ✅ Website running on your computer
- ✅ Backend checking 5 flight websites
- ✅ AI making smart recommendations
- ✅ Everything working locally (free)

### Time Required
- **Setup:** 15 minutes
- **API keys:** 15 minutes  
- **Running:** 5 minutes
- **Deploy:** 20 minutes

**Total: ~1 hour to go live online**

---

## Get API Keys

### Step 1: Create SerpAPI Account (Google Flights)

1. Go to: https://serpapi.com
2. Click **Sign Up**
3. Create account (email + password)
4. Go to **Dashboard**
5. Copy your **API Key** (looks like: `sksk_live_abc123...`)
6. Save it somewhere safe

**Free Tier:** 100 searches/month

### Step 2: Create RapidAPI Account (Skyscanner, Kayak)

1. Go to: https://rapidapi.com
2. Click **Sign Up**
3. Create account (use email or GitHub)
4. Search for **"Skyscanner API"** in the search bar
5. Click on first result
6. Click **Subscribe to Test**
7. Go back to Dashboard → **My Apps**
8. Find your **API Key** at the top
9. Copy it

**Free Tier:** 5,000 requests/month

### Step 3: Create Kiwi API Account

1. Go to: https://tequila.kiwi.com
2. Click **Get API Key**
3. Create account (email + password)
4. Verify email
5. Copy your **API Key**

**Free Tier:** 500 calls/month

### Step 4: Create Claude API Account

1. Go to: https://console.anthropic.com
2. Click **Sign Up**
3. Create account
4. Verify email
5. Go to **API Keys**
6. Click **Create New Key**
7. Copy the key
8. You get **$5 free credit** to start!

**Free Tier:** $5 starter credit (~500+ analyses)

---

## Run Locally

### Prerequisites Check

Before starting, verify you have:

```bash
# Check if Node.js is installed
node --version

# Should show: v14.0.0 or higher (any version is fine)
```

If not installed, go to: https://nodejs.org and download

### Step 1: Create .env File

In the root folder (`/mnt/user-data/outputs/`), create a file named `.env`:

```
SERPAPI_KEY=paste_your_serpapi_key_here
RAPIDAPI_KEY=paste_your_rapidapi_key_here
KIWI_API_KEY=paste_your_kiwi_key_here
CLAUDE_API_KEY=paste_your_claude_key_here
PORT=3001
```

**Replace `paste_your_xxx_here` with your actual API keys**

### Step 2: Install Dependencies

Open Terminal/Command Prompt in the project folder:

```bash
npm install
```

This installs:
- `express` - Web server
- `cors` - Allow websites to talk to backend
- `dotenv` - Load API keys from .env
- `axios` - Make API calls

Wait for it to finish (2-3 minutes on first run)

### Step 3: Start the Backend Server

```bash
npm start
```

You should see:
```
🚀 Flight comparison server running on http://localhost:3001
API endpoint: POST http://localhost:3001/api/search-flights
```

**Leave this running!** ✅

### Step 4: Open the Website

In a new Terminal/Command Prompt window:

```bash
# On Windows
start src/frontend/vacation_dashboard_enhanced.html

# On Mac
open src/frontend/vacation_dashboard_enhanced.html

# On Linux
firefox src/frontend/vacation_dashboard_enhanced.html
```

Or manually open the file:
- Go to: `/mnt/user-data/outputs/src/frontend/`
- Right-click: `vacation_dashboard_enhanced.html`
- Select: **Open with Browser**

### Step 5: Test It!

1. Select a holiday from dropdown
2. Select a destination
3. Make sure "From Airport" is set (default: DFW)
4. Click **Find Cheapest Flights**
5. Wait 5-10 seconds for results

You should see:
- 🏆 Cheapest flight highlighted
- All prices from different websites
- 🤖 AI recommendation at bottom

**Congrats! It works!** 🎉

---

## Deploy to Cloud

### Option 1: Deploy Backend to Vercel (Recommended - FREE)

**Why Vercel?** Free, fast, simple

#### Step 1: Push to GitHub (if not done already)

```bash
git add .
git commit -m "Add flight comparison system"
git push -u origin main
```

#### Step 2: Go to Vercel

1. Go to: https://vercel.com
2. Click **Sign Up**
3. Use **GitHub login** (easiest)
4. Authorize Vercel to access your repos
5. Click **Import Project**
6. Select: `shoebsm-web/vacation_use`
7. Click **Import**

#### Step 3: Add Environment Variables

1. Go to **Settings** tab
2. Click **Environment Variables**
3. Add each key one by one:
   - Name: `SERPAPI_KEY`, Value: your_key
   - Name: `RAPIDAPI_KEY`, Value: your_key
   - Name: `KIWI_API_KEY`, Value: your_key
   - Name: `CLAUDE_API_KEY`, Value: your_key
4. Click **Deploy**

Vercel deploys automatically. Wait 2-3 minutes.

When done, you'll see:
```
✅ Deployment successful!
https://vacation-use.vercel.app/
```

#### Step 4: Update Frontend to Use Live Backend

In `vacation_dashboard_enhanced.html`, change:

```javascript
// Line 449 (find this):
const API_URL = 'http://localhost:3001/api';

// Change to:
const API_URL = 'https://vacation-use.vercel.app/api';
```

Save and push:
```bash
git add src/frontend/vacation_dashboard_enhanced.html
git commit -m "Update API endpoint to production"
git push
```

### Option 2: Deploy to Railway (Alternative - FREE)

1. Go to: https://railway.app
2. Click **Start Project**
3. Connect GitHub
4. Select: `vacation_use` repo
5. Click **Deploy**
6. Add environment variables (same as Vercel)
7. Railway gives you a live URL automatically

### Option 3: Deploy Frontend to GitHub Pages

Your website is already on GitHub Pages at:
```
https://shoebsm-web.github.io/vacation_use/
```

Just push your updated HTML:
```bash
git add .
git commit -m "Enhanced flight comparison UI"
git push
```

Files in `/docs` folder automatically become your website! ✨

---

## Complete URLs After Deployment

Once deployed:

| Component | URL |
|-----------|-----|
| **Website** | https://shoebsm-web.github.io/vacation_use/ |
| **Backend** | https://vacation-use.vercel.app |
| **API Endpoint** | https://vacation-use.vercel.app/api/search-flights |

---

## Testing the Live System

### Test Locally First

```bash
# Terminal 1: Start backend
npm start

# Terminal 2: Open website
start src/frontend/vacation_dashboard_enhanced.html
```

Search for a flight. You should get results in 5-10 seconds.

### Test After Deploying

1. Open website in browser:
   ```
   https://shoebsm-web.github.io/vacation_use/
   ```

2. Open Console (F12 or Ctrl+Shift+J)

3. You should **NOT** see errors

4. Search for flights

5. Check:
   - Do you see flight results?
   - Do you see AI recommendation?
   - Are prices showing?

If issues, check Troubleshooting section below.

---

## Troubleshooting

### Issue 1: "Cannot find module 'express'"

**Solution:**
```bash
npm install
```

Then restart server:
```bash
npm start
```

### Issue 2: "API Key is invalid"

**Solution:**
1. Double-check you copied the full key
2. Make sure there are no extra spaces
3. Check `.env` file exists in root folder
4. Restart server

### Issue 3: "Server is running but no results"

**Solution:**
1. Check backend console for errors
2. Try a different airport code
3. Make sure internet is working
4. Wait 10 seconds (API calls take time)

### Issue 4: "Cannot connect to backend"

**Solution:**
1. Make sure backend is running:
   ```bash
   npm start
   ```

2. Check API_URL in HTML is correct:
   ```javascript
   const API_URL = 'http://localhost:3001/api'; // Local
   // or
   const API_URL = 'https://vacation-use.vercel.app/api'; // Production
   ```

### Issue 5: "404 Not Found" on GitHub Pages

**Solution:**
1. Check file is in `/docs` folder (or root)
2. Make sure filename is exactly: `vacation_dashboard_enhanced.html`
3. URL should be: `https://shoebsm-web.github.io/vacation_use/vacation_dashboard_enhanced.html`

### Issue 6: "CORS Error" in console

**Solution:**
Backend CORS is already configured. This means:
1. Backend might be down (restart it)
2. API_URL might be wrong
3. Browser cache (try Incognito mode)

---

## File Structure

```
vacation_use/
├── src/
│   ├── backend/
│   │   ├── flight_comparison_server.js    ← Main server
│   │   ├── vacation_backend.js             ← Original backend
│   │   └── vacation_api_demo.js
│   └── frontend/
│       ├── vacation_dashboard_enhanced.html ← New website
│       └── vacation_dashboard.html          ← Original website
├── .env                                    ← Your API keys (DON'T commit!)
├── .env.example                            ← Template for .env
├── .gitignore                              ← Tells Git to ignore .env
├── package.json                            ← Dependencies
├── README.md                               ← Project docs
└── docs/                                   ← GitHub Pages folder (if using)
```

---

## Common API Codes

Airport codes for testing:

```
DFW  = Dallas/Fort Worth
MIA  = Miami
LAX  = Los Angeles
NYC  = New York City
LAS  = Las Vegas
CUN  = Cancun
ORD  = Chicago
SFO  = San Francisco
BOS  = Boston
ATL  = Atlanta
```

Holiday dates:
```
Sep 7   = Labor Day
Oct 12  = Columbus Day
Nov 11  = Veterans Day
Nov 26  = Thanksgiving
Dec 25  = Christmas
```

---

## Next Steps

### After Successful Setup:

1. ✅ Test locally
2. ✅ Deploy backend to Vercel
3. ✅ Deploy frontend to GitHub Pages
4. ✅ Share your website link with friends
5. ✅ Monitor API usage (stay within free tiers)
6. ✅ Add more features (price alerts, saved trips, etc.)

### To Add Features:

See: `FEATURE_IDEAS.md` (coming soon!)

---

## Support

If something doesn't work:

1. **Check errors in Console** (F12)
2. **Check backend console** for error messages
3. **Verify all API keys** are correct
4. **Try fresh setup** (delete node_modules, run npm install again)
5. **Check internet connection**

Still stuck? Open an issue on GitHub! 🙌

---

## Cost Summary

| Service | Cost | Notes |
|---------|------|-------|
| SerpAPI | Free | 100/month free |
| RapidAPI | Free | 5,000/month free |
| Kiwi | Free | 500/month free |
| Claude | Free | $5 starter credit |
| Vercel | Free | Free tier for Node.js |
| GitHub Pages | Free | Free tier for static sites |
| Domain | Optional | Use GitHub Pages subdomain |
| **TOTAL** | **$0** | All free! |

**Your system is completely free to run!** ✨

---

## Success Checklist

- [ ] All 4 API keys obtained
- [ ] `.env` file created with keys
- [ ] Backend running locally (`npm start`)
- [ ] Frontend loads in browser
- [ ] Flight search returns results
- [ ] AI recommendation displays
- [ ] Backend deployed to Vercel
- [ ] Frontend deployed to GitHub Pages
- [ ] Live website works online
- [ ] Friends can access your link

**Congratulations! You've built an AI-powered flight comparison system!** 🎉🚀

