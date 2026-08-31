# Push to GitHub - Step by Step

Your repository: `https://github.com/shoebsm-web/vacation_use`

## Option 1: Using GitHub CLI (Easiest)

```bash
# Install GitHub CLI if you don't have it: https://cli.github.com

# Login to GitHub
gh auth login

# Choose HTTPS
# Answer "yes" to "Authenticate Git with your GitHub credentials"

# Navigate to the project folder
cd /path/to/vacation-planner-2026

# Set up git
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files
git add .

# Commit
git commit -m "Initial commit: Complete vacation planner with backend, dashboard, and documentation"

# Rename branch to main
git branch -M main

# Add remote
git remote add origin https://github.com/shoebsm-web/vacation_use.git

# Push
git push -u origin main
```

## Option 2: Using HTTPS with Personal Access Token

1. **Create a Personal Access Token:**
   - Go to https://github.com/settings/tokens
   - Click "Generate new token"
   - Give it a name: "Vacation Planner"
   - Select scopes: `repo`
   - Click "Generate token"
   - **Copy the token** (you won't see it again!)

2. **Push using the token:**
```bash
# Navigate to project
cd /path/to/vacation-planner-2026

# Set up git
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files
git add .

# Commit
git commit -m "Initial commit: Complete vacation planner with backend, dashboard, and documentation"

# Rename branch
git branch -M main

# Add remote with HTTPS
git remote add origin https://github.com/shoebsm-web/vacation_use.git

# Push (it will ask for username and password)
git push -u origin main

# For username: your GitHub username
# For password: paste the personal access token you created
```

## Option 3: Using SSH (If you've set up SSH keys)

```bash
cd /path/to/vacation-planner-2026

git init
git config user.name "Your Name"
git config user.email "your.email@example.com"

git add .
git commit -m "Initial commit: Complete vacation planner with backend, dashboard, and documentation"
git branch -M main

# Add remote with SSH
git remote add origin git@github.com:shoebsm-web/vacation_use.git

git push -u origin main
```

## Verify It Worked

After pushing, check your repository:
```bash
# Verify remote
git remote -v

# Should show:
# origin  https://github.com/shoebsm-web/vacation_use.git (fetch)
# origin  https://github.com/shoebsm-web/vacation_use.git (push)
```

Visit: https://github.com/shoebsm-web/vacation_use

You should see all your files uploaded! 🎉

## Next: Enable GitHub Pages

1. Go to your repository Settings
2. Find "Pages" in the left sidebar
3. Set Source to: `main` branch, `/docs` folder
4. Click Save

Your dashboard will be live at: `https://shoebsm-web.github.io/vacation_use/`

## Troubleshooting

### "fatal: not a git repository"
Make sure you ran `git init` first

### "Permission denied (publickey)"
Use Option 2 (HTTPS with token) instead of SSH

### "Support for password authentication was removed"
Use a Personal Access Token (Option 2) instead of your password

### Files not showing up
Make sure all files are in the `/outputs` directory and you ran `git add .` before commit
