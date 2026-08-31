# 🎁 All FREE Resources - Direct Links & Setup

## 🚀 Get Everything (Free!)

### 1️⃣ FLIGHT PRICE APIs

#### **SerpAPI (Google Flights)**
- **What:** Access Google Flights data
- **Free tier:** 100 calls/month
- **Sign up:** https://serpapi.com
- **Steps:**
  1. Go to link above
  2. Click "Start Free Trial"
  3. Create account
  4. Copy your API key
  5. Done!

#### **RapidAPI (Skyscanner, Kayak, etc.)**
- **What:** Access many flight APIs from one place
- **Free tier:** 5,000 requests/month
- **Sign up:** https://rapidapi.com
- **Popular APIs there:**
  - Skyscanner API
  - Kayak API
  - Kiwi API
  - Expedia API
- **Steps:**
  1. Go to link above
  2. Click "Sign Up"
  3. Create account
  4. Search for "flight API"
  5. Pick one, click "Subscribe"
  6. Copy API key
  7. Done!

#### **Kiwi API (Budget Flights)**
- **What:** Find cheap flights
- **Free tier:** 500 requests/month
- **Sign up:** https://tequila.kiwi.com/
- **Steps:**
  1. Go to link
  2. Create account
  3. Get API key
  4. Done!

#### **Amadeus API (Airlines Official)**
- **What:** Official airline data
- **Free tier:** 5,000 calls/month
- **Sign up:** https://developers.amadeus.com
- **Steps:**
  1. Go to link
  2. Sign up
  3. Verify email
  4. Get API key
  5. Done!

---

### 2️⃣ AI BRAIN (Claude)

#### **Claude API**
- **What:** AI that analyzes prices & suggests best deals
- **Cost:** Free $5 credit (goes far!)
- **Sign up:** https://console.anthropic.com
- **Steps:**
  1. Go to link
  2. Sign up with email
  3. Verify email
  4. Go to "API keys"
  5. Create new key
  6. Copy it
  7. Done!

**How much does $5 cover?**
- 1 analysis = ~0.01 cents
- $5 = 500+ analyses
- You get FREE $5 to start!

---

### 3️⃣ CODING TOOLS (Build It)

#### **Node.js (Engine to Run Code)**
- **What:** Let you run JavaScript on computer
- **Free:** Yes, forever
- **Download:** https://nodejs.org
- **Which version:** Download the green one (LTS)
- **Steps:**
  1. Click download link
  2. Run installer
  3. Accept everything (click Next)
  4. Done!
- **Test it worked:**
  ```
  node --version
  ```
  Should show a version number

#### **VS Code (Write Code)**
- **What:** Program to write code
- **Free:** Yes
- **Download:** https://code.visualstudio.com
- **Steps:**
  1. Click download
  2. Run installer
  3. Accept everything
  4. Done!

#### **Postman (Test APIs)**
- **What:** Test if API calls work
- **Free:** Yes
- **Download:** https://www.postman.com/downloads/
- **Steps:**
  1. Download
  2. Install
  3. Create account
  4. Done!

---

### 4️⃣ HOSTING (Put Online)

#### **GitHub Pages (Frontend)**
- **What:** Host your website
- **Free:** Yes, unlimited
- **Already using:** Yes!
- **URL:** Your website lives at:
  ```
  https://shoebsm-web.github.io/vacation_use/
  ```

#### **Vercel (Backend)**
- **What:** Host your server/API
- **Free:** Yes
- **Sign up:** https://vercel.com
- **Steps:**
  1. Go to link
  2. Click "Sign Up"
  3. Use GitHub to login (easiest)
  4. Done!

#### **Railway (Backend Alternative)**
- **What:** Host your server
- **Free:** $5/month (basically free)
- **Sign up:** https://railway.app
- **Steps:**
  1. Go to link
  2. Click "Start Project"
  3. Connect GitHub
  4. Deploy
  5. Done!

---

### 5️⃣ LIBRARIES (Make Coding Easier)

#### **axios** (Make API calls)
```bash
npm install axios
```

#### **express** (Build server)
```bash
npm install express
```

#### **cors** (Allow cross-site requests)
```bash
npm install cors
```

#### **dotenv** (Hide API keys safely)
```bash
npm install dotenv
```

#### **react** (Build frontend)
```bash
npm install react
```

---

## 📋 Free Account Checklist

Create these accounts (all FREE):

- [ ] **SerpAPI** - https://serpapi.com
- [ ] **RapidAPI** - https://rapidapi.com
- [ ] **Kiwi API** - https://tequila.kiwi.com
- [ ] **Amadeus API** - https://developers.amadeus.com
- [ ] **Claude API** - https://console.anthropic.com
- [ ] **Vercel** - https://vercel.com
- [ ] **GitHub** - Already have it!

**Time to create all: ~20 minutes**

---

## 🔑 How to Get & Store API Keys

### Step 1: Get API Key
Each service shows you an API key (looks like):
```
sksk_live_abcdef123456789...
```

### Step 2: Save Somewhere Safe
Create a `.env` file (hidden file):

```
GOOGLE_FLIGHTS_API_KEY=your_key_here
SKYSCANNER_API_KEY=your_key_here
CLAUDE_API_KEY=your_key_here
KIWI_API_KEY=your_key_here
```

**IMPORTANT:** Never share these keys!

### Step 3: Use in Code
```javascript
const apiKey = process.env.GOOGLE_FLIGHTS_API_KEY;
```

---

## 💻 Setup on Your Computer

### **Windows Users:**

1. **Install Node.js**
   - Go to: https://nodejs.org
   - Click download
   - Click installer
   - Accept all (click Next)
   - Restart computer

2. **Install VS Code**
   - Go to: https://code.visualstudio.com
   - Download
   - Install
   - Open it

3. **Test it works:**
   - Open Command Prompt (Win key + R, type `cmd`)
   - Type: `node --version`
   - Should show a version number

### **Mac Users:**

1. **Install Node.js**
   - Go to: https://nodejs.org
   - Click download
   - Click installer
   - Follow steps
   - Restart computer

2. **Install VS Code**
   - Go to: https://code.visualstudio.com
   - Download for Mac
   - Drag to Applications
   - Open

3. **Test it works:**
   - Open Terminal (Cmd + Space, type `terminal`)
   - Type: `node --version`
   - Should show version

### **Linux Users:**

```bash
# Install Node.js
sudo apt update
sudo apt install nodejs npm

# Install VS Code
sudo snap install code --classic

# Test
node --version
```

---

## 🎯 What Each Step Does

```
1. Download Node.js + VS Code
   ↓
2. Create free API accounts
   ↓
3. Get API keys (looks like passwords)
   ↓
4. Write code that calls APIs
   ↓
5. API returns flight prices
   ↓
6. Send to Claude AI
   ↓
7. Claude says "cheapest is X"
   ↓
8. Show user on website
```

---

## 💰 Total Cost

| Item | Cost | Notes |
|------|------|-------|
| Node.js | Free | Forever |
| VS Code | Free | Forever |
| SerpAPI | Free | 100/month |
| RapidAPI | Free | 5,000/month |
| Kiwi | Free | 500/month |
| Amadeus | Free | 5,000/month |
| Claude | Free | $5 starter credit |
| GitHub Pages | Free | Forever |
| Vercel | Free | Forever |
| **TOTAL** | **$0** | You might spend $5 later |

**For your first year: Completely FREE** ✅

---

## 🚀 Next: Quick Start Guide

Once you have everything installed:

### Step 1: Create Project Folder
```bash
mkdir flight-comparison
cd flight-comparison
```

### Step 2: Initialize Node Project
```bash
npm init -y
```

### Step 3: Install Libraries
```bash
npm install axios express cors dotenv
```

### Step 4: Create .env File
```
GOOGLE_FLIGHTS_API_KEY=your_key
SKYSCANNER_API_KEY=your_key
CLAUDE_API_KEY=your_key
```

### Step 5: Create app.js
```javascript
const express = require('express');
const app = express();

app.get('/flights', (req, res) => {
  res.json({ message: 'Getting cheapest flights...' });
});

app.listen(3000, () => console.log('Running on 3000'));
```

### Step 6: Run It
```bash
node app.js
```

**Done!** Your server is running! 🎉

---

## 📚 Free Learning Resources

**If you get stuck, these help:**

1. **How APIs work** - Search YouTube for "API explained"
2. **Node.js tutorial** - https://nodejs.org/en/docs/guides/
3. **Claude API docs** - https://console.anthropic.com/docs/api
4. **Express.js basics** - https://expressjs.com/starter/basic-routing.html

---

## ✅ You Now Have

- ✅ Links to every free resource
- ✅ Instructions for each
- ✅ Total cost breakdown ($0)
- ✅ Setup steps for your computer
- ✅ Quick start code

**Ready to build?** Tell me:
1. What's your OS? (Windows/Mac/Linux)
2. Is Node.js + VS Code already installed?
3. Want me to walk you through Step 1?
