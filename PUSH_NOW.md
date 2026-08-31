# 🚀 Push to GitHub - Quick Reference

Your repo: **https://github.com/shoebsm-web/vacation_use**

## ⚡ Fastest Way (Recommended)

### Step 1: Install GitHub CLI
https://cli.github.com

### Step 2: Run These Commands

**Copy and paste each command one by one:**

```bash
# Navigate to where your files are (outputs folder)
cd /path/to/outputs

# Initialize git
git init

# Configure git with your name and email
git config user.name "Your Name"
git config user.email "your@email.com"

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Complete vacation planner with backend, dashboard, and documentation"

# Set main branch
git branch -M main

# Add remote
git remote add origin https://github.com/shoebsm-web/vacation_use.git

# Login to GitHub (first time only)
gh auth login
# Follow prompts, choose HTTPS

# Push to GitHub
git push -u origin main
```

## ✅ Verify It Worked

Visit: https://github.com/shoebsm-web/vacation_use

You should see all your files! 🎉

## 📱 Next: Enable GitHub Pages

1. Go to **Settings** in your repo
2. Click **Pages** (left sidebar)
3. Set:
   - **Source:** Deploy from a branch
   - **Branch:** main
   - **Folder:** /docs
4. Click **Save**

Your dashboard will be live at:
```
https://shoebsm-web.github.io/vacation_use/
```

## 🆘 If Something Goes Wrong

### "Permission denied"
Use Personal Access Token instead:
1. Go: https://github.com/settings/tokens
2. Create new token with "repo" scope
3. When git asks for password, paste the token

### "Command not found: gh"
Install GitHub CLI: https://cli.github.com

### "Support for password authentication was removed"
Use Personal Access Token (see above)

## 📁 What Gets Uploaded

All files in `/outputs`:
```
✓ src/backend/
  - vacation_backend.js (core engine)
  - vacation_api_demo.js (tests)
  
✓ src/frontend/
  - vacation_dashboard.html (the dashboard)
  
✓ docs/
  - All documentation files
  
✓ Root files
  - README.md, package.json, .gitignore, etc.
```

## 🎯 One Command to Rule Them All

If you have GitHub CLI installed, this does everything:

```bash
cd /path/to/outputs && \
git init && \
git config user.name "Your Name" && \
git config user.email "your@email.com" && \
git add . && \
git commit -m "Initial commit: Complete vacation planner" && \
git branch -M main && \
git remote add origin https://github.com/shoebsm-web/vacation_use.git && \
gh auth login && \
git push -u origin main
```

---

## 💡 Pro Tips

- All files are ready to upload, no modifications needed
- The dashboard works completely offline (no APIs needed)
- Once on GitHub, you can clone it anywhere with:
  ```bash
  git clone https://github.com/shoebsm-web/vacation_use.git
  ```
- Share the live dashboard link with anyone!

---

**That's it! Go live in 5 minutes! 🚀**
