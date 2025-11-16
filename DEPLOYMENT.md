# TouchType - Deployment Guide

This guide will help you deploy TouchType to various web hosting platforms. The application is a static site built with Vite and can be deployed to any static hosting service.

## Prerequisites

- Node.js 18 or higher installed locally (for building)
- npm or yarn package manager
- Git installed (for version control)

## Quick Start - Build Locally

To test the production build locally:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

The build output will be in the `dist` folder.

---

## Option 1: Vercel (Recommended - Easiest)

Vercel is the easiest option with automatic deployments.

### Steps:

1. **Push your code to GitHub** (if not already done)

2. **Go to [vercel.com](https://vercel.com)** and sign up/login

3. **Click "Add New Project"**

4. **Import your GitHub repository**

5. **Configure the project:**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. **Click "Deploy"**

Your app will be live in ~2 minutes at `https://your-project.vercel.app`

### Automatic Deployments:
Every push to your main branch will automatically deploy to Vercel.

### Custom Domain:
Go to Project Settings → Domains to add your custom domain.

---

## Option 2: Netlify

Netlify is another excellent free option with great performance.

### Steps:

1. **Push your code to GitHub**

2. **Go to [netlify.com](https://netlify.com)** and sign up/login

3. **Click "Add new site" → "Import an existing project"**

4. **Connect to your Git provider** and select your repository

5. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

6. **Click "Deploy site"**

Your app will be live at `https://random-name.netlify.app`

### Configuration File:
The `netlify.toml` file in this repository will automatically configure Netlify.

### Custom Domain:
Go to Site settings → Domain management to add your custom domain.

---

## Option 3: GitHub Pages

Free hosting directly from your GitHub repository.

### Steps:

1. **Push your code to GitHub**

2. **Go to your repository on GitHub**

3. **Go to Settings → Pages**

4. **Under "Build and deployment":**
   - Source: **GitHub Actions**

5. **The workflow is already configured** in `.github/workflows/deploy.yml`

6. **Push a commit to the main branch** to trigger the deployment

Your app will be live at `https://yourusername.github.io/TouchType`

### Custom Domain:
Add a `CNAME` file in the `public` folder with your domain name.

---

## Option 4: Cloudflare Pages

Fast and free with excellent global CDN.

### Steps:

1. **Push your code to GitHub**

2. **Go to [pages.cloudflare.com](https://pages.cloudflare.com)** and login

3. **Click "Create a project" → "Connect to Git"**

4. **Select your repository**

5. **Configure build settings:**
   - Framework preset: **None** (or Vite)
   - Build command: `npm run build`
   - Build output directory: `dist`

6. **Click "Save and Deploy"**

Your app will be live at `https://touchtype.pages.dev`

---

## Option 5: Generic Static Hosting (cPanel, shared hosting, etc.)

If you have traditional web hosting with cPanel or similar:

### Steps:

1. **Build the project locally:**
   ```bash
   npm install
   npm run build
   ```

2. **Upload the `dist` folder contents** to your web server:
   - Use FTP/SFTP client (FileZilla, Cyberduck, etc.)
   - Or use cPanel File Manager
   - Upload everything inside the `dist` folder to your public_html or www directory

3. **Access your website** at your domain

### Important for subdirectories:
If deploying to a subdirectory (e.g., `yourdomain.com/touchtype`), update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/touchtype/',
  plugins: [react()],
  // ... rest of config
})
```

Then rebuild before uploading.

---

## Option 6: AWS S3 + CloudFront

For professional deployments with AWS.

### Steps:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Create an S3 bucket:**
   - Go to AWS S3 Console
   - Create a bucket with a unique name
   - Enable "Static website hosting"

3. **Upload the `dist` folder contents** to the bucket

4. **Set bucket policy for public access:**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```

5. **Optional: Set up CloudFront** for CDN and HTTPS

---

## Environment Variables

This application doesn't use environment variables, so no additional configuration is needed.

---

## Build Optimization

The production build is already optimized with:
- ✅ Minification
- ✅ Tree shaking
- ✅ Code splitting
- ✅ Asset optimization

The main bundle (~590KB) is large due to PDF.js library, which is necessary for PDF parsing functionality.

---

## Troubleshooting

### Build fails with TypeScript errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### PDF files not loading in production
Make sure the PDF.js worker is being loaded from CDN (already configured in `src/App.tsx`).

### 404 errors on refresh
Make sure your hosting platform is configured to redirect all routes to `index.html`:
- **Vercel/Netlify**: Automatically handled
- **GitHub Pages**: Handled by GitHub Actions workflow
- **Other platforms**: Add redirect rules (see `netlify.toml` or `public/_redirects`)

### Large bundle size warning
This is expected due to PDF.js. The warning can be ignored or suppressed in `vite.config.ts`:

```typescript
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000
  },
  // ... rest of config
})
```

---

## Performance Tips

1. **Use a CDN**: Platforms like Vercel, Netlify, and Cloudflare automatically provide global CDN
2. **Enable compression**: Most platforms enable gzip/brotli automatically
3. **Cache headers**: Configured automatically by modern hosting platforms
4. **HTTPS**: All recommended platforms provide free SSL certificates

---

## Monitoring & Analytics

To add analytics to your deployed app:

### Google Analytics
Add to `index.html` in the `<head>` section:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Vercel Analytics
Automatically available in Vercel dashboard (free tier available)

---

## Custom Domain Setup

Most platforms support custom domains for free:

1. **Purchase a domain** from GoDaddy, Namecheap, Cloudflare, etc.

2. **Add domain to your hosting platform:**
   - Vercel: Project Settings → Domains
   - Netlify: Site Settings → Domain Management
   - GitHub Pages: Settings → Pages → Custom Domain

3. **Configure DNS records:**
   - Add A record or CNAME as instructed by your platform
   - Wait for DNS propagation (5 minutes to 48 hours)

4. **Enable HTTPS** (automatic on all platforms)

---

## Recommended Deployment Platform

For this project, we recommend **Vercel** because:
- ✅ Zero configuration needed
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments from Git
- ✅ Free tier is generous
- ✅ Great performance
- ✅ Easy custom domain setup

---

## Support

If you encounter deployment issues:
1. Check the platform's status page
2. Review build logs in your hosting dashboard
3. Ensure all dependencies are listed in `package.json`
4. Test the production build locally first with `npm run preview`

---

## Quick Comparison

| Platform | Free Tier | Custom Domain | HTTPS | Build Time | Difficulty |
|----------|-----------|---------------|-------|------------|------------|
| **Vercel** | ✅ Generous | ✅ Free | ✅ Auto | ~1-2 min | ⭐ Easy |
| **Netlify** | ✅ Generous | ✅ Free | ✅ Auto | ~1-2 min | ⭐ Easy |
| **GitHub Pages** | ✅ Unlimited | ✅ Free | ✅ Auto | ~2-3 min | ⭐⭐ Medium |
| **Cloudflare Pages** | ✅ Generous | ✅ Free | ✅ Auto | ~1-2 min | ⭐ Easy |
| **AWS S3** | ⚠️ Paid | ✅ Yes | ⚠️ Manual | N/A | ⭐⭐⭐ Hard |
| **Traditional Hosting** | Varies | ✅ Yes | Varies | N/A | ⭐⭐ Medium |

---

Happy deploying! 🚀
