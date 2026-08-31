# 🔑 Get Your API Keys (Simple Steps - No Code Needed!)

This guide shows you EXACTLY where to click to get your free API keys.

---

## What You're Getting

You're going to get 4 free API keys that let your website talk to:
- ✅ Google Flights
- ✅ Skyscanner
- ✅ Kayak
- ✅ Budget airlines (Kiwi)
- ✅ Claude AI (smart brain)

**Time needed:** ~20 minutes

---

## API Key #1: SerpAPI (Google Flights)

### Step-by-Step:

1. **Go here:** https://serpapi.com

2. **Click:** "Start Free Trial" (big red button)

3. **Fill in:**
   - First Name: Your name
   - Email: Your email
   - Password: Make a password
   - Accept terms (check the box)

4. **Click:** "Create Account"

5. **Check email** for verification link, click it

6. **Log in** to https://serpapi.com with your email/password

7. **Find your API Key:**
   - Go to **Dashboard** (top right)
   - Look for "API Key"
   - It looks like: `sksk_live_abc123def456...`

8. **Copy it** (click copy button next to it)

9. **Save it** in a notepad file called "api_keys.txt"

```
SERPAPI_KEY = sksk_live_abc123def456...
```

✅ **Done!** Keep this safe.

---

## API Key #2: RapidAPI (Skyscanner + Kayak)

### Step-by-Step:

1. **Go here:** https://rapidapi.com

2. **Click:** "Sign Up" (top right)

3. **Choose:** "Sign Up with Email" 

4. **Fill in:**
   - Email: Your email
   - Password: Make a password

5. **Click:** "Sign Up"

6. **Verify email** (check your inbox)

7. **Log in** to https://rapidapi.com

8. **Find your API Key:**
   - Click your **Profile** (top right)
   - Click **"Settings"**
   - Look for **"X-RapidAPI-Key"**
   - It looks like: `abc123def456...`

9. **Copy it**

10. **Save it** in your notepad:

```
RAPIDAPI_KEY = abc123def456...
```

✅ **Done!** You can now use Skyscanner, Kayak, and more.

---

## API Key #3: Kiwi (Budget Flights)

### Step-by-Step:

1. **Go here:** https://tequila.kiwi.com

2. **Click:** "Get API Key" (big button middle of page)

3. **Sign Up:**
   - Email: Your email
   - Password: Make a password
   - Accept terms

4. **Click:** "Create Account"

5. **Check email** for verification

6. **Click verification link** in your email

7. **Log back in** to https://tequila.kiwi.com

8. **Find your API Key:**
   - Should be on **Dashboard**
   - Look for "API Key" or "API Token"
   - Copy it (looks like: `abc123def456...`)

9. **Save it:**

```
KIWI_API_KEY = abc123def456...
```

✅ **Done!**

---

## API Key #4: Claude AI (The Smart Brain)

### Step-by-Step:

1. **Go here:** https://console.anthropic.com

2. **Click:** "Sign Up" (top right)

3. **Use Email:**
   - Email: Your email
   - Password: Make a password

4. **Click:** "Sign Up"

5. **Verify email** (check your inbox)

6. **Log in** to https://console.anthropic.com

7. **Get your API Key:**
   - Click **"API Keys"** on the left
   - Click **"Create New Key"** (blue button)
   - Give it a name: "vacation-planner"
   - Click **"Create Key"**
   - **Copy the key immediately** (won't show again!)
   - It looks like: `sk-ant-abc123def456...`

8. **Save it:**

```
CLAUDE_API_KEY = sk-ant-abc123def456...
```

✅ **Done!** You got free $5 credit to start!

---

## Save All Keys in ONE Place

Create a notepad file and save all your keys:

**File name:** `api_keys.txt`

**Content:**
```
SERPAPI_KEY=sksk_live_abc123def456...
RAPIDAPI_KEY=abc123def456...
KIWI_API_KEY=abc123def456...
CLAUDE_API_KEY=sk-ant-abc123def456...
```

**⚠️ IMPORTANT:** 
- Never share this file
- Never upload to internet
- Keep it private
- Delete after setting up `.env`

---

## Next: Create .env File

Once you have all 4 keys:

### Step 1: Open Notepad

Open a blank text file (Notepad or any text editor)

### Step 2: Copy This Template

```
SERPAPI_KEY=your_serpapi_key_here
RAPIDAPI_KEY=your_rapidapi_key_here
KIWI_API_KEY=your_kiwi_key_here
CLAUDE_API_KEY=your_claude_key_here
PORT=3001
```

### Step 3: Replace with Your Keys

Replace each `your_xxx_key_here` with actual keys:

```
SERPAPI_KEY=sksk_live_abc123def456...
RAPIDAPI_KEY=abc123def456...
KIWI_API_KEY=abc123def456...
CLAUDE_API_KEY=sk-ant-abc123def456...
PORT=3001
```

### Step 4: Save File

1. Go to folder: `/mnt/user-data/outputs/`
2. Save file as: `.env`
   - Note: Filename is `.env` (NOT `.env.txt`)
   - In Windows, use "Save As" → "All Files" → type `.env`

**⚠️ On Windows:**
- Use Notepad → File → Save As
- Filename: `.env`
- Save as type: "All Files (*.*)"
- Location: Your project root folder

### Step 5: Verify

Your project folder should now have:
```
vacation_use/
├── src/
├── .env          ← This file (your keys!)
├── .env.example
├── package.json
└── ...other files
```

---

## Verify It's Working

### Check 1: File exists?
Go to your project folder. Do you see `.env` file?
✅ = Good!

### Check 2: Content correct?
Right-click `.env` → Open with Notepad
Do you see your API keys?
✅ = Good!

### Check 3: No errors?
Do you see all 4 lines with your keys?
✅ = Good!

---

## What These Keys Do

| Key | Lets you check | Free monthly limit |
|-----|----------------|--------------------|
| **SERPAPI_KEY** | Google Flights | 100 searches |
| **RAPIDAPI_KEY** | Skyscanner + Kayak | 5,000 requests |
| **KIWI_API_KEY** | Budget airlines | 500 calls |
| **CLAUDE_API_KEY** | AI analysis | $5 credit (~500+ uses) |

**Total monthly value:** ~$100 in free API calls! ✨

---

## Quick Reference

### URLs to Get Keys:
- SerpAPI: https://serpapi.com
- RapidAPI: https://rapidapi.com
- Kiwi: https://tequila.kiwi.com
- Claude: https://console.anthropic.com

### Where Keys Go:
- File name: `.env`
- Location: Root of your project
- Format: `VARIABLENAME=keyvalue`

### Most Important:
- ⚠️ Never share `.env` file
- ⚠️ Add `.env` to `.gitignore` (already done!)
- ⚠️ Don't commit to GitHub
- ✅ Keep `.env.example` on GitHub (without real keys)

---

## Congratulations! 🎉

You now have:
- ✅ 4 free API keys
- ✅ Access to millions of flights
- ✅ AI brain for recommendations
- ✅ Everything set up to run your system

**Next step:** Follow "SETUP_AND_DEPLOYMENT.md" to run everything!

---

## Still Need Help?

| Problem | Solution |
|---------|----------|
| Can't find API key | Go to account Settings → API |
| Website shows "Invalid key" | Copy again carefully (no spaces!) |
| "Key not found" error | Make sure `.env` file is in root folder |
| Key stops working | You might have hit monthly limit |

---

## Security Tips

✅ **Do:**
- Keep `.env` private
- Use strong passwords
- Check free tier limits monthly
- Regenerate keys if exposed

❌ **Don't:**
- Share API keys with anyone
- Upload `.env` to GitHub
- Commit keys to version control
- Use same key for multiple projects

You're all set! 🚀

