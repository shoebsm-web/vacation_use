# 🚀 GET REAL FLIGHT DATA WORKING - QUICK START

**Follow these steps exactly. It's easier than it looks!**

---

## 📋 What You Have Now

### Files Created:
1. ✅ `.env` - Your secret API key (hidden)
2. ✅ `server.js` - Backend server (keeps key secret)
3. ✅ `skypulse-with-backend.html` - Website that uses real data
4. ✅ `package.json` - Instructions for installing libraries

---

## 🎯 STEP 1: Start Your Backend Server

### Open Command Line:
**Windows:** Press `Windows Key + R`, type `cmd`, press Enter

**Mac:** Press `Cmd + Space`, type `terminal`, press Enter

### Go to Your Project:
```
cd Documents\vacation_use
```
(Mac: `cd ~/vacation_use`)

### Install Libraries:
```
npm install
```
Wait 1-2 minutes for it to finish.

### Start Server:
```
npm start
```

### You Should See:
```
╔════════════════════════════════════════╗
║   🚀 BACKEND SERVER STARTED! 🚀        ║
╚════════════════════════════════════════╝

✅ Server running at: http://localhost:3000
✅ API key: HIDDEN (secret and safe) 🔒
```

**✅ Server is running! Don't close this window!**

---

## 🎯 STEP 2: Open Your Website

In your browser, go to one of these:

### Option A: Local File (Simplest)
1. Open file manager
2. Go to `vacation_use` folder
3. Double-click: `skypulse-with-backend.html`

### Option B: GitHub Pages (Current)
https://shoebsm-web.github.io/vacation_use/skypulse-standalone.html

(Note: This won't work with backend yet - we need to update GitHub)

---

## 🎯 STEP 3: Test Server Connection

On your website, you should see:

```
🟢 Connected to backend server ✅
```

**If you see green checkmark → Server is connected!** ✅

**If you see red X:**
- Make sure `npm start` is still running
- Check that `.env` file has your API key
- Try refreshing the page

---

## 🎯 STEP 4: Search for Flights

1. Select a holiday (example: "Memorial Day")
2. Select a destination (example: "Miami")
3. Select trip length (example: "5 days")
4. Click: "Search"

### Watch What Happens:

**In your browser:**
- "Searching flights..." appears
- Real flights appear!

**In your server window (command line):**
```
📡 Searching flights from DFW to MIA on 2026-05-25
✅ Found 12 flights
```

**YOU'RE GETTING REAL DATA!** 🎉

---

## ✅ Checklist

- [ ] Backend server running (`npm start` in command line)
- [ ] Server shows: "BACKEND SERVER STARTED!"
- [ ] Website shows green: "Connected to backend server"
- [ ] Can search flights
- [ ] See real flights appear
- [ ] Server window shows: "Found X flights"

---

## 🤔 Troubleshooting

### Red X - "Cannot connect to backend server"

**Solution:**
1. Check if `npm start` is still running in command line
2. If closed, run `npm start` again
3. Refresh website
4. Wait 5 seconds

### Error: "AVIATIONSTACK_KEY not found"

**Solution:**
1. Check `.env` file exists in `vacation_use` folder
2. Make sure it contains: `AVIATIONSTACK_KEY=your_actual_key`
3. Restart: `npm start`

### No flights appear / Error in browser console

**Solution:**
1. Press F12 to open developer tools
2. Click "Console" tab
3. Look for red error messages
4. Copy the error
5. Tell me the error

### Port 3000 already in use

**Solution:**
Something else is using port 3000

Method 1: Restart your computer

Method 2: Use different port
- Open `server.js`
- Find: `const PORT = 3000;`
- Change to: `const PORT = 3001;`
- Change website: `const BACKEND_URL = 'http://localhost:3001';`

---

## 📊 How It Works

```
Your Computer:
  
  ┌─────────────────────┐
  │   Website (Browser) │ ← You see this
  │                     │
  │ "Get me flights!"   │
  └──────────┬──────────┘
             │ Asks nicely
             ↓
  ┌─────────────────────┐
  │  Server (localhost) │ ← Backend keeps key secret
  │  Port: 3000         │
  │                     │
  │ Reads API key from  │
  │ .env file           │
  └──────────┬──────────┘
             │ Requests with hidden key
             ↓
  ┌──────────────────────────┐
  │   Aviationstack (Cloud)  │ ← Real flight data
  │   api.aviationstack.com  │
  └──────────┬───────────────┘
             │ Sends real flights
             ↓
  ┌─────────────────────┐
  │   Server (Backend)  │
  │                     │
  │ Receives real data  │
  └──────────┬──────────┘
             │ Sends to website
             ↓
  ┌─────────────────────┐
  │  Website (Browser)  │
  │                     │
  │ "Here are flights!" │
  │ Shows real data     │
  └─────────────────────┘
```

**Your API key:** Never leaves the server ✅

---

## 🎯 NEXT STEPS

### To keep using this:
1. Open command line and run `npm start` every time you want to use the site
2. Keep that window open while browsing
3. Open the website
4. Search for flights - you get REAL data!

### To deploy publicly later:
1. Upload backend to hosting (Vercel, Heroku, etc.)
2. Update website BACKEND_URL to point to your server
3. Requires internet connection - not just local

### To add to GitHub Pages:
1. Commit everything: `git add . && git commit -m "Add real flight data"`
2. Push: `git push`
3. Update main SkyPulse to use backend

---

## 💡 Remember

**Your API key is SAFE because:**
- It's in `.env` file (local only)
- `.gitignore` keeps it off GitHub
- Backend keeps it secret from browser
- Only backend can see it

**You're using REAL data from Aviationstack:**
- 100 requests/month FREE
- Real flights, real prices
- Real airline names

**It costs ZERO:**
- Server: Free (runs on your computer)
- Backend: Free (just Node.js - you have it)
- API: Free tier (100 req/month)

---

## ✨ YOU DID IT!

You just:
1. ✅ Created a secret storage for your API key
2. ✅ Built a backend server
3. ✅ Connected website to real flight data
4. ✅ Kept your API key completely secret

**This is what real developers do!** 🚀

---

## 📞 Need Help?

If something breaks:
1. Check the checklist above
2. Look at troubleshooting
3. Tell me what you see
4. I'll help!

**NOW GO ENJOY YOUR REAL FLIGHT DATA!** ✈️
