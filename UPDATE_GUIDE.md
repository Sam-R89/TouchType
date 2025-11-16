# 🔄 Update to Latest Version

Follow these steps to ensure you have the latest version of TouchType with all new features.

## Option 1: Fresh Install (Recommended)

If you want a clean start:

```bash
# 1. Pull latest changes from GitHub
git pull origin claude/typing-reading-app-017iphZUWrWiMJFFUwtYTkan

# 2. Remove old dependencies
rm -rf node_modules package-lock.json

# 3. Install fresh dependencies
npm install

# 4. Verify the build works
npm run build

# 5. Start development server
npm run dev
```

## Option 2: Quick Update

If you already have the repo set up:

```bash
# 1. Pull latest changes
git pull origin claude/typing-reading-app-017iphZUWrWiMJFFUwtYTkan

# 2. Update dependencies (in case package.json changed)
npm install

# 3. Start development server
npm run dev
```

## ✅ Verify Installation

After installation, verify you have the latest features:

### 1. Check Package Version
```bash
cat package.json | grep version
```
Should show: `"version": "1.0.0"`

### 2. Check Dependencies
```bash
npm list --depth=0
```
Should show:
- react@18.3.1
- react-dom@18.3.1
- react-pdf@10.2.0

### 3. Check for PDF Worker
```bash
ls public/pdf.worker.min.mjs
```
Should exist (1MB file)

### 4. Check Build
```bash
npm run build
```
Should complete without errors

## 🧪 Test New Features

After updating, test these new features:

### Test 1: Progressive Text Rendering
1. Start dev server: `npm run dev`
2. Click "Try Demo"
3. You should see:
   - Only ~800 characters displayed at once
   - No performance lag when typing
   - Window shifts as you type

### Test 2: Chapter 1 Detection
1. Upload a PDF with chapters
2. Text should start from "Chapter 1" automatically
3. Front matter (TOC, title pages) should be skipped

### Test 3: PDF Worker
1. Upload any PDF file
2. Should load without errors
3. Text should extract successfully

## 🐛 Troubleshooting

### If `npm install` fails:

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Install again
npm install
```

### If PDF worker is missing:

```bash
# Manually copy the worker
npm run copy-pdf-worker

# Check if it's there
ls public/pdf.worker.min.mjs
```

### If build fails:

```bash
# Check for TypeScript errors
npx tsc --noEmit

# If errors persist, reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run build
```

### If git pull shows conflicts:

```bash
# Stash local changes
git stash

# Pull latest
git pull origin claude/typing-reading-app-017iphZUWrWiMJFFUwtYTkan

# Apply stashed changes (if needed)
git stash pop
```

## 📦 What's New in Latest Version

After updating, you'll have:

✅ **Chapter 1 Detection**
   - Automatically skips front matter in PDFs/TXT files
   - Starts from actual content

✅ **Progressive Text Rendering**
   - Shows ~1000 characters at a time
   - Smooth performance with large files
   - Dynamic window that shifts as you type

✅ **Fixed PDF Worker**
   - Local worker file (no CDN issues)
   - Reliable PDF loading
   - Works offline

✅ **Production Ready**
   - All deployment configs included
   - Comprehensive documentation
   - Zero vulnerabilities

## 🚀 Deploy Latest Version

After updating locally, deploy to production:

### Vercel (Easiest):
```bash
# Just push to GitHub - Vercel auto-deploys
git push origin claude/typing-reading-app-017iphZUWrWiMJFFUwtYTkan
```

### Manual Deploy:
```bash
# Build production version
npm run build

# The dist folder is ready to deploy
# Upload to your hosting platform
```

## 📊 Version Check Commands

Quick commands to verify your version:

```bash
# Check Git branch
git branch --show-current

# Check last commit
git log -1 --oneline

# Check if you're up to date
git fetch origin
git status

# See what files changed
git diff HEAD origin/claude/typing-reading-app-017iphZUWrWiMJFFUwtYTkan
```

## 💡 Best Practice

For deployment, always:

1. **Pull latest changes**
   ```bash
   git pull origin claude/typing-reading-app-017iphZUWrWiMJFFUwtYTkan
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Test locally**
   ```bash
   npm run build
   npm run preview
   ```

4. **Deploy**
   - Push to GitHub (for Vercel/Netlify auto-deploy)
   - Or upload `dist` folder to your host

---

## 🎯 Quick Reference

```bash
# Complete update workflow:
git pull origin claude/typing-reading-app-017iphZUWrWiMJFFUwtYTkan && \
npm install && \
npm run build && \
npm run preview
```

If everything works in preview, you're good to deploy! 🚀
