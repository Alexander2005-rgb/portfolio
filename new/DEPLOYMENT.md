# 🚀 Deployment Guide

## Overview

This guide covers deploying your MERN portfolio to production across different platforms.

## Prerequisites

- GitHub repository with your code
- MongoDB Atlas account (already setup)
- Hosting account (choose one below)

---

## Backend Deployment

### Option 1: Heroku (Easiest)

#### Setup:

1. Create [Heroku](https://www.heroku.com) account
2. Install Heroku CLI
3. Login: `heroku login`

#### Deploy:

```bash
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set ATLAS_URI=mongodb+srv://...
heroku config:set CLIENT_URL=https://your-frontend-url.com
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

#### Update Frontend:

In `frontend/.env`:

```env
REACT_APP_API_URL=https://your-app-name.herokuapp.com
```

### Option 2: Railway.app

#### Setup:

1. Create [Railway](https://railway.app) account
2. Connect GitHub
3. Select repository

#### Configure:

1. Add PostgreSQL or MongoDB
2. Set environment variables:
   - `ATLAS_URI`
   - `CLIENT_URL`
   - `NODE_ENV=production`

3. Railway auto-deploys on push

### Option 3: Render

#### Setup:

1. Create [Render](https://render.com) account
2. Connect GitHub
3. Select repository

#### Create Web Service:

1. Click "New" → "Web Service"
2. Select your repository
3. Set environment to Node
4. Add environment variables
5. Deploy

---

## Frontend Deployment

### Option 1: Vercel (Recommended for React)

#### Setup:

1. Create [Vercel](https://vercel.com) account
2. Connect GitHub

#### Deploy:

1. Import your project
2. Select `frontend` as root directory
3. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   ```
4. Deploy

**Auto-deploys on push to main branch**

### Option 2: Netlify

#### Setup:

1. Create [Netlify](https://netlify.com) account
2. Connect GitHub

#### Deploy:

1. Click "New site from Git"
2. Select repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `frontend/build`
4. Add environment variables:
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   ```
5. Deploy

### Option 3: GitHub Pages

#### Setup:

1. Add to `frontend/package.json`:
   ```json
   "homepage": "https://yourusername.github.io/portfolio"
   ```

#### Deploy:

```bash
cd frontend
npm run build
npm install --save-dev gh-pages
```

Add to `package.json`:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Deploy:

```bash
npm run deploy
```

---

## Step-by-Step Deployment (Recommended)

### Step 1: Prepare Code

```bash
# Commit everything
git add .
git commit -m "Final version for deployment"
git push origin main
```

### Step 2: Deploy Backend

**Using Heroku:**

```bash
heroku create your-portfolio-api
heroku config:set ATLAS_URI=mongodb+srv://user:pass@...
heroku config:set CLIENT_URL=https://your-frontend-url.com
heroku config:set NODE_ENV=production
git push heroku main
```

Get your backend URL from Heroku dashboard (e.g., `https://your-portfolio-api.herokuapp.com`)

### Step 3: Update Frontend

In `frontend/.env.production`:

```env
REACT_APP_API_URL=https://your-portfolio-api.herokuapp.com
```

### Step 4: Deploy Frontend

**Using Vercel:**

1. Go to [Vercel](https://vercel.com)
2. Import GitHub repository
3. Select `frontend` folder
4. Add environment variable with backend URL
5. Deploy

### Step 5: Verify

- Visit your frontend URL
- Test all functionality
- Check browser console for errors
- Check backend logs for API issues

---

## Production Checklist

### Backend

- [ ] MongoDB Atlas configured for production
- [ ] IP whitelist set to your server only
- [ ] Environment variables set on hosting
- [ ] CORS configured with production frontend URL
- [ ] Error logging configured
- [ ] Database backups enabled

### Frontend

- [ ] Build optimized with `npm run build`
- [ ] Environment variables configured
- [ ] API URL points to production backend
- [ ] No console errors or warnings
- [ ] All images load correctly
- [ ] Responsive design tested on mobile

### Security

- [ ] No `.env` files in repository
- [ ] MongoDB password changed from default
- [ ] HTTPS enabled on frontend
- [ ] API authentication considered (optional)
- [ ] Rate limiting added (optional)

---

## Custom Domain

### Point Domain to Frontend

**Vercel/Netlify:**

1. Go to project settings
2. Add custom domain
3. Update DNS records (instructions provided)

**GitHub Pages:**
Add `CNAME` file to frontend/public/:

```
yourdomain.com
```

### Configure Backend URL

If using custom domain for backend:

1. Update `frontend/.env.production`
2. Update `CORS` in backend
3. Redeploy both

---

## Monitoring & Maintenance

### View Logs

**Heroku:**

```bash
heroku logs --tail
heroku logs --source app
heroku logs --source web
```

**Vercel:**

- Dashboard → Function Logs
- Real-time deployment logs

### Restart Services

**Heroku:**

```bash
heroku restart
heroku restart --dyno web.1
```

### Monitor Performance

- Vercel Analytics
- Heroku Metrics
- MongoDB Cloud Monitoring

---

## Troubleshooting Deployment

### Issue: Build fails

**Solution:**

- Check build logs
- Verify environment variables
- Ensure all dependencies installed
- Check for syntax errors

### Issue: 503 Service Unavailable

**Solution:**

- Check backend is running
- Verify database connection
- Review server logs
- Check IP whitelist

### Issue: CORS errors in production

**Solution:**

- Update `CLIENT_URL` in backend
- Verify frontend URL is correct
- Restart backend server
- Clear browser cache

### Issue: Images not loading

**Solution:**

- Check image URLs are absolute
- Verify CORS headers
- Use public image hosting (Imgur, Cloudinary, etc.)
- Check file permissions

### Issue: Slow performance

**Solution:**

- Optimize images
- Enable compression
- Add caching headers
- Use CDN for assets
- Upgrade database plan

---

## Scaling (As You Grow)

1. **Upgrade Heroku dyno** from Free to Paid
2. **Upgrade MongoDB** from M0 to M2+ tier
3. **Add caching** (Redis)
4. **Implement CDN** (Cloudflare)
5. **Add monitoring** (New Relic, Datadog)
6. **Database replication** for reliability

---

## Cost Estimate (Monthly)

| Service            | Free          | Paid           |
| ------------------ | ------------- | -------------- |
| Frontend (Vercel)  | $0            | $20+           |
| Backend (Heroku)   | $0            | $7+            |
| Database (MongoDB) | $0            | $0-10          |
| Domain             | $10-15/year   | -              |
| **Total**          | **~$10/year** | **~$37/month** |

---

## Backup & Recovery

### MongoDB Backup

1. In Atlas: Collections → ...
2. Select collections to export
3. Download as JSON/CSV

### Code Backup

- GitHub is your backup
- Use GitHub releases
- Tag important commits

### Restore

1. Create new MongoDB cluster
2. Import data
3. Update connection string
4. Test thoroughly

---

**Your portfolio is ready for the world! 🌍**

For detailed platform-specific guides, visit:

- [Vercel Docs](https://vercel.com/docs)
- [Heroku Docs](https://devcenter.heroku.com)
- [Netlify Docs](https://docs.netlify.com)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
