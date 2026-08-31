#!/bin/bash

# Vacation Planner - Push to GitHub Script
# This script automates pushing your project to GitHub

set -e  # Exit on error

echo "🚀 Vacation Planner - GitHub Push Script"
echo "========================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first:"
    echo "   https://git-scm.com/downloads"
    exit 1
fi

# Get GitHub username from input or use default
read -p "Enter your GitHub username [shoebsm-web]: " GITHUB_USER
GITHUB_USER=${GITHUB_USER:-shoebsm-web}

# Get repository name
read -p "Enter repository name [vacation_use]: " REPO_NAME
REPO_NAME=${REPO_NAME:-vacation_use}

# Get commit message
read -p "Enter commit message [Initial commit: Complete vacation planner]: " COMMIT_MSG
COMMIT_MSG=${COMMIT_MSG:-"Initial commit: Complete vacation planner"}

# Get git config
read -p "Enter your git username for commits [Vacation Planner]: " GIT_NAME
GIT_NAME=${GIT_NAME:-"Vacation Planner"}

read -p "Enter your git email for commits [vacation@planner.com]: " GIT_EMAIL
GIT_EMAIL=${GIT_EMAIL:-"vacation@planner.com"}

echo ""
echo "📋 Configuration:"
echo "   GitHub Username: $GITHUB_USER"
echo "   Repository: $REPO_NAME"
echo "   Git Name: $GIT_NAME"
echo "   Git Email: $GIT_EMAIL"
echo ""

read -p "Continue? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 1
fi

# Initialize git (if not already)
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
else
    echo "✓ Git repository already initialized"
fi

# Configure git
echo "⚙️ Configuring git..."
git config user.name "$GIT_NAME"
git config user.email "$GIT_EMAIL"

# Add all files
echo "📁 Adding files..."
git add .

# Commit
echo "💾 Creating commit..."
git commit -m "$COMMIT_MSG" || echo "⚠️ Commit already exists or no changes to commit"

# Rename branch to main
echo "🔀 Setting up main branch..."
git branch -M main

# Add remote (remove if exists)
if git remote get-url origin >/dev/null 2>&1; then
    echo "🔗 Updating remote origin..."
    git remote set-url origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
else
    echo "🔗 Adding remote origin..."
    git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
fi

# Show remote
echo ""
echo "🔍 Remote configuration:"
git remote -v

echo ""
echo "📤 Ready to push! You have two options:"
echo ""
echo "Option A: Using GitHub CLI (Recommended)"
echo "   1. Install: https://cli.github.com"
echo "   2. Run: gh auth login"
echo "   3. Run: git push -u origin main"
echo ""
echo "Option B: Using Personal Access Token"
echo "   1. Create token: https://github.com/settings/tokens"
echo "   2. Run: git push -u origin main"
echo "   3. Username: $GITHUB_USER"
echo "   4. Password: Paste your token"
echo ""
echo "Option C: Using SSH (if configured)"
echo "   1. Run: git push -u origin main"
echo ""

read -p "Push now? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "You can push manually later with:"
    echo "   git push -u origin main"
    echo ""
    exit 0
fi

# Try to push
echo ""
echo "🚀 Pushing to GitHub..."
echo "   Repository: https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""

if git push -u origin main 2>&1; then
    echo ""
    echo "✅ SUCCESS! Your project is now on GitHub!"
    echo ""
    echo "📍 Repository: https://github.com/$GITHUB_USER/$REPO_NAME"
    echo ""
    echo "Next steps:"
    echo "1. Go to Settings → Pages"
    echo "2. Set source to: main branch, /docs folder"
    echo "3. Your dashboard will be live at:"
    echo "   https://$GITHUB_USER.github.io/$REPO_NAME/"
    echo ""
else
    echo ""
    echo "⚠️ Push failed. This is usually due to authentication."
    echo ""
    echo "Solutions:"
    echo "1. Use GitHub CLI:"
    echo "   • Install: https://cli.github.com"
    echo "   • Login: gh auth login"
    echo "   • Push: git push -u origin main"
    echo ""
    echo "2. Use Personal Access Token:"
    echo "   • Create: https://github.com/settings/tokens"
    echo "   • Scope: 'repo'"
    echo "   • Run: git push -u origin main"
    echo "   • Paste token when prompted for password"
    echo ""
    exit 1
fi

echo "🎉 All done!"
