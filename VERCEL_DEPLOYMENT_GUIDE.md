# Vercel Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Code Quality

- [x] All eslint warnings fixed
- [x] Environment variables properly configured
- [x] No hardcoded secrets or sensitive data
- [x] Build process tested locally

### ✅ Project Structure

```
porftfolip/
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── .env.production
│   ├── .vercelignore
│   └── vercel.json
└── backend/
    ├── models/
    ├── routes/
    ├── server.js
    ├── package.json
    ├── .env
    ├── .vercelignore
    └── vercel.json
```

## 🚀 Deployment Steps

### Step 1: Prepare Your Local Project

1. **Ensure all dependencies are installed:**

   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

2. **Test the build locally:**

   ```bash
   # Frontend
   cd frontend
   npm run build
   ```

3. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

### Step 2: Deploy Backend to Vercel

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**

   ```bash
   vercel login
   ```

3. **Deploy backend:**
   ```bash
   cd backend
   vercel --prod
   ```
4. **Follow prompts:**
   - Set project name: `portfolio-backend`
   - Link to existing project: No
   - Modified files: Confirm

5. **Set Environment Variables in Vercel Dashboard:**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add the following variables:
     ```
     MONGODB_URI = your_mongodb_atlas_connection_string
     JWT_SECRET = your_secure_jwt_secret
     OWNER_REGISTRATION_CODE = portfolio2024secret
     CLIENT_URL = https://your-frontend-url.vercel.app
     ```

6. **Redeploy after adding env vars:**
   ```bash
   vercel --prod --env MONGODB_URI=your_uri --env JWT_SECRET=your_secret
   ```

### Step 3: Deploy Frontend to Vercel

1. **Update Backend URL:**
   Edit `frontend/.env.production`:

   ```
   REACT_APP_API_URL=https://your-backend-url.vercel.app
   ```

2. **Deploy frontend:**

   ```bash
   cd frontend
   vercel --prod
   ```

3. **Follow prompts:**
   - Set project name: `portfolio-frontend`
   - Link to existing project: No
   - Modified files: Confirm

4. **Set Environment Variables in Vercel Dashboard:**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add:
     ```
     REACT_APP_API_URL = https://your-backend-url.vercel.app
     ```

### Step 4: Verify Deployment

1. **Check Frontend:**
   - Open your frontend URL
   - Verify all pages load correctly
   - Test navigation

2. **Check Backend:**
   - Test API endpoints: `https://your-backend-url.vercel.app/api/health`
   - Should return: `{ "status": "API is running" }`

3. **Test Integration:**
   - Login functionality
   - Project CRUD operations
   - Certificate CRUD operations
   - File downloads (resume)

## 🔗 Important URLs

After deployment, you'll have:

- **Frontend URL:** `https://your-frontend-name.vercel.app`
- **Backend URL:** `https://your-backend-name.vercel.app`
- **Vercel Dashboard:** `https://vercel.com/dashboard`

## 📝 Environment Variables Reference

### Backend (.env and Vercel)

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=your-secret-key-here-make-it-long-and-secure
OWNER_REGISTRATION_CODE=portfolio2024secret
CLIENT_URL=https://your-frontend-url.vercel.app
PORT=5000
```

### Frontend (.env.production)

```
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

## 🔐 Security Checklist

- [x] No secrets in code files
- [x] Environment variables in Vercel dashboard
- [x] CORS properly configured
- [x] JWT token validation enabled
- [x] Password hashing with bcryptjs
- [x] Protected routes for owner-only operations
- [x] HTTPS enforced (automatic on Vercel)

## 🐛 Troubleshooting

### Issue: CORS Errors

**Solution:** Ensure `CLIENT_URL` in backend `.env` matches your frontend URL

### Issue: API 404 Errors

**Solution:** Check `REACT_APP_API_URL` in frontend `.env.production`

### Issue: Database Connection Failed

**Solution:** Verify `MONGODB_URI` in Vercel dashboard environment variables

### Issue: JWT Token Errors

**Solution:** Ensure `JWT_SECRET` is the same in all deployments

### Issue: Build Fails

**Solution:**

1. Check build logs in Vercel dashboard
2. Run `npm run build` locally to test
3. Ensure all dependencies are in package.json

## 📊 Deployment Timeline

| Component            | Time        | Status |
| -------------------- | ----------- | ------ |
| Backend Setup        | ~5 min      | ⏳     |
| Frontend Setup       | ~5 min      | ⏳     |
| Environment Config   | ~3 min      | ⏳     |
| Testing & Validation | ~10 min     | ⏳     |
| **Total**            | **~23 min** | ⏳     |

## 🎉 Next Steps After Deployment

1. **Monitor Performance:**
   - Check Vercel Analytics
   - Monitor database performance
   - Review API response times

2. **Setup Custom Domain (Optional):**
   - In Vercel Dashboard → Settings → Domains
   - Add your custom domain
   - Update DNS records

3. **Enable Auto-Deployments:**
   - Connect GitHub repository
   - Auto-deploy on push to main branch

4. **Backup Database:**
   - MongoDB Atlas has built-in backups
   - Enable automated daily backups

## 💡 Tips

- Keep development and production environments separate
- Use different MongoDB databases for dev and prod
- Monitor Vercel usage (free tier limits)
- Set up error tracking (Sentry optional)
- Enable email notifications for deployments

---

**Questions?** Check Vercel documentation: https://vercel.com/docs
