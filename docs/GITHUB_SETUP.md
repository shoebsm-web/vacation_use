# 🚀 GitHub Setup Guide - Vacation Planner 2026

Complete step-by-step instructions to push your vacation planner to GitHub.

## Step 1: Create a GitHub Repository

### Option A: Via GitHub Website
1. Go to [github.com](https://github.com) and sign in
2. Click **+** (top right) → **New repository**
3. Repository name: `vacation-planner-2026`
4. Description: "Interactive vacation planning dashboard with bank holidays, flight pricing, and destination recommendations"
5. Choose: **Public** (to share) or **Private** (for your use only)
6. **Do NOT** initialize with README (we have one)
7. Click **Create repository**

### Option B: Via GitHub CLI
```bash
gh repo create vacation-planner-2026 --public --source=. --remote=origin --push
```

## Step 2: Initialize Git Locally

```bash
# Navigate to your project folder
cd /path/to/vacation-planner-2026

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Vacation planner backend and dashboard"

# Add remote (replace with your username)
git remote add origin https://github.com/YOUR_USERNAME/vacation-planner-2026.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Project Structure on GitHub

Your GitHub repository will have:

```
vacation-planner-2026/
├── src/
│   ├── backend/
│   │   ├── vacation_backend.js
│   │   └── vacation_api_demo.js
│   └── frontend/
│       └── vacation_dashboard.html
├── docs/
│   ├── BACKEND_ARCHITECTURE.md
│   ├── API_REFERENCE.md
│   └── GITHUB_SETUP.md
├── package.json
├── .gitignore
└── README.md
```

## Step 4: Files to Include

### Must Include:
- ✅ `package.json` - Node.js configuration
- ✅ `README.md` - Project documentation
- ✅ `.gitignore` - Git ignore rules
- ✅ `src/backend/vacation_backend.js` - Core backend
- ✅ `src/backend/vacation_api_demo.js` - API examples
- ✅ `src/frontend/vacation_dashboard.html` - Dashboard UI
- ✅ `docs/BACKEND_ARCHITECTURE.md` - Architecture docs

### Optional But Recommended:
- 📄 `LICENSE` (MIT is recommended)
- 📝 `CONTRIBUTING.md` - Contribution guidelines
- 🐛 `.github/ISSUE_TEMPLATE/` - Issue templates

## Step 5: Deploy Dashboard Online (Free)

### Option 1: GitHub Pages (Recommended)
GitHub Pages can host your static HTML dashboard for free!

```bash
# Create a docs folder
mkdir -p docs

# Copy dashboard to docs folder (GitHub Pages root)
cp src/frontend/vacation_dashboard.html docs/index.html

# Commit and push
git add docs/index.html
git commit -m "Add GitHub Pages dashboard"
git push
```

Then enable GitHub Pages:
1. Go to your repo → **Settings**
2. Left sidebar → **Pages**
3. Under "Source", select: **Deploy from a branch**
4. Select: **main** branch, **/docs** folder
5. Click **Save**

Your dashboard will be live at: `https://YOUR_USERNAME.github.io/vacation-planner-2026/`

### Option 2: Netlify (More Advanced)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy from your directory
netlify deploy --prod --dir=src/frontend/
```

### Option 3: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## Step 6: README Badges (Optional)

Add these badges to your README.md for style:

```markdown
# Vacation Planner 2026

[![GitHub license](https://img.shields.io/github/license/YOUR_USERNAME/vacation-planner-2026)](https://github.com/YOUR_USERNAME/vacation-planner-2026/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/vacation-planner-2026?style=social)](https://github.com/YOUR_USERNAME/vacation-planner-2026)
[![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/vacation-planner-2026?style=social)](https://github.com/YOUR_USERNAME/vacation-planner-2026)

A smart, modern web application for planning vacations...
```

## Step 7: Create Release & Tags

Tag important versions:

```bash
# Create a version tag
git tag -a v1.0.0 -m "Version 1.0.0: Initial release with backend and dashboard"

# Push tags to GitHub
git push origin v1.0.0
```

On GitHub:
1. Go to your repo → **Releases**
2. Click **Create a new release**
3. Select tag: **v1.0.0**
4. Title: **Version 1.0.0 - Initial Release**
5. Add release notes
6. Click **Publish release**

## Step 8: Optional Enhancements

### Add GitHub Actions CI/CD

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
```

This automatically tests your code when you push!

### Add Code of Conduct

Create `CODE_OF_CONDUCT.md` to welcome contributors:

```markdown
# Code of Conduct

## Our Pledge

In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone.

## Our Standards

- Using welcoming and inclusive language
- Being respectful of differing opinions and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

...
```

## Step 9: Keep Your Repository Updated

After initial setup, maintain your repo:

```bash
# Check status
git status

# Add changes
git add .

# Commit with descriptive message
git commit -m "Add: New destination database entries"

# Push to GitHub
git push origin main

# Check recent commits
git log --oneline -10
```

## Useful Git Commands

```bash
# View all branches
git branch -a

# Create and switch to new branch
git checkout -b feature/new-feature

# Switch back to main
git checkout main

# Merge feature branch
git merge feature/new-feature

# Delete branch
git branch -d feature/new-feature

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

## Sharing Your Project

### 1. Share the GitHub Link
```
https://github.com/YOUR_USERNAME/vacation-planner-2026
```

### 2. Share the Live Dashboard
```
https://YOUR_USERNAME.github.io/vacation-planner-2026/
```

### 3. Add to Social Media
- Tweet about it with #VacationPlanner #GitHub
- Share on LinkedIn with project description
- Include in your portfolio

## Troubleshooting

### "Permission denied (publickey)"
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub: Settings → SSH and GPG keys → New SSH key
```

### "Remote already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/vacation-planner-2026.git
```

### "Detached HEAD state"
```bash
git checkout main
```

## Next Steps

1. ✅ Push to GitHub
2. ✅ Enable GitHub Pages
3. ✅ Share the link with friends
4. ✅ Add more features (real flight API, hotel integration, etc.)
5. ✅ Collect GitHub stars ⭐

---

**Questions?** Check out:
- [GitHub Help Documentation](https://docs.github.com)
- [Git Cheat Sheet](https://github.github.com/training-kit/downloads/github-git-cheat-sheet.pdf)
- [GitHub Actions Guide](https://docs.github.com/en/actions)
