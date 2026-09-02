# 🚀 HOW TO RUN YOUR BACKEND SERVER

**Treat this like a recipe. Just follow the steps exactly.**

---

## 📋 **What You Need:**

- Your computer
- That's it!

---

## 🎯 **STEP 1: Open Command Line**

### Windows:
1. Press **Windows Key + R**
2. Type: `cmd`
3. Press **Enter**
4. A black box opens ✅

### Mac:
1. Press **Cmd + Space**
2. Type: `terminal`
3. Press **Enter**
4. A terminal window opens ✅

---

## 🎯 **STEP 2: Go to Your Project Folder**

In the command line, type this (copy and paste):

### Windows:
```
cd Documents\vacation_use
```

### Mac:
```
cd ~/vacation_use
```

Then press **Enter**.

**You should see something like:**
```
C:\Users\YourName\Documents\vacation_use>
```

---

## 🎯 **STEP 3: Install Required Libraries**

Type this and press **Enter**:
```
npm install
```

This downloads all the tools your server needs.

**Wait for it to finish.** It might take 1-2 minutes.

You'll see something like:
```
added 50 packages in 45s
```

---

## 🎯 **STEP 4: Start Your Server**

Type this and press **Enter**:
```
npm start
```

**If it works, you'll see:**
```
╔════════════════════════════════════════╗
║   🚀 BACKEND SERVER STARTED! 🚀        ║
╚════════════════════════════════════════╝

✅ Server running at: http://localhost:3000
✅ API key: HIDDEN (secret and safe) 🔒
```

**YOU'RE DONE! Server is running!** ✅

---

## 🔗 **Test It Works**

Open your browser and go to:
```
http://localhost:3000/api/health
```

You should see:
```json
{
  "status": "Server is running! ✅",
  "time": "2024-12-01T10:30:00.000Z"
}
```

**If you see this → Your server works!** ✅

---

## 🛑 **To Stop the Server**

Press: **Ctrl + C** in the command line

---

## ⚠️ **Troubleshooting**

### Error: "npm: command not found"
**Solution:** You need to install Node.js
- Go to: https://nodejs.org/
- Download "LTS" version
- Install it
- Restart your computer
- Try again

### Error: "AVIATIONSTACK_KEY not found"
**Solution:** Check your `.env` file
1. Make sure `.env` file exists in `vacation_use` folder
2. Make sure it has: `AVIATIONSTACK_KEY=your_actual_key`
3. Save it
4. Try `npm start` again

### Error: "Port 3000 already in use"
**Solution:** Something else is using port 3000
- Kill the other thing or use a different port
- Tell me if this happens

### The server won't start at all
**Solution:**
1. Make sure `.env` file exists
2. Make sure your Aviationstack key is in `.env`
3. Make sure it's the NEW key (not the old revoked one)
4. Try again

---

## 📊 **What Your Server Does**

Think of it like a mailman:

```
Your Website (browser)
       ↓ "Get me flights!"
    SERVER (localhost:3000)
       ↓ "Give me flights" (with secret API key)
  Aviationstack
       ↓ "Here are flights!"
    SERVER
       ↓ "Here are flights!"
Your Website
```

Your **API key never leaves the server**. It's safe. ✅

---

## 🎯 **Next Step**

Once the server is running, we'll update your website to use it!

The website will ask your server for flights instead of using fake data.

---

## 💡 **Keep the Server Running**

**Leave this command line window open while you use your website.**

If you close it, the server stops and your website can't get real data.

---

**Questions? Let me know!** 👍
