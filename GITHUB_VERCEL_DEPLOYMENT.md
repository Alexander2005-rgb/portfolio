# GitHub to Vercel Deployment Guide

## 📋 Prerequisites

- GitHub account (https://github.com)
- Vercel account (https://vercel.com)
- Project pushed to GitHub repository

## 🚀 Step-by-Step Deployment Process

### Step 1: Initialize Git Repository (If Not Already Done)

```bash
cd d:\porftfolip
git init
git add .
git commit -m "Initial commit - portfolio project ready for deployment"
```

### Step 2: Create GitHub Repository

1. **Go to GitHub:** https://github.com/new
2. **Create new repository:**
   - Repository name: `portfolio-fullstack`
   - Description: `MERN Stack Portfolio with Projects, Certificates, Skills`
   - Choose: Public (recommended for portfolio) or Private
   - **Do NOT initialize README** (we already have content)
   - Click "Create repository"

3. **Add GitHub remote and push:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/portfolio-fullstack.git
   git branch -M main
   git push -u origin main
   ```

### Step 3: Deploy Backend to Vercel via GitHub

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard

2. **Create New Project:**
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Choose GitHub (authorize if needed)
   - Select your `portfolio-fullstack` repository
   - Click "Continue"

3. **Configure Backend Project:**
   - **Project Name:** `portfolio-backend`
   - **Root Directory:** Select `backend` from dropdown
   - **Framework Preset:** `Other`
   - **Build Command:** `npm install && npm run build` (leave default)
   - **Output Directory:** Leave empty
   - **Install Command:** `npm install`
   - Click "Deploy"

4. **Add Environment Variables:**
   - After deployment, go to Settings → Environment Variables
   - Add the following variables:

     ```
     Variable Name: MONGODB_URI
     Value: mongodb+srv://username:password@cluster.mongodb.net/portfolio

     Variable Name: JWT_SECRET
     Value: your_secure_jwt_secret_key_here_make_it_very_long

     Variable Name: OWNER_REGISTRATION_CODE
     Value: portfolio2024secret

     Variable Name: CLIENT_URL
     Value: https://your-frontend-name.vercel.app

     Variable Name: NODE_ENV
     Value: production
     ```

   - Click "Save"

5. **Redeploy with Environment Variables:**
   - Go to Deployments
   - Click the latest deployment
   - Click "Redeploy" button
   - Wait for build to complete

6. **Copy Backend URL:**
   - Once deployed, copy your backend URL
   - Format: `https://portfolio-backend-xxx.vercel.app`
   - Save for next step

### Step 4: Deploy Frontend to Vercel via GitHub

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard

2. **Create New Project:**
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Select your `portfolio-fullstack` repository again
   - Click "Continue"

3. **Configure Frontend Project:**
   - **Project Name:** `portfolio-frontend`
   - **Root Directory:** Select `frontend` from dropdown
   - **Framework Preset:** `Create React App`
   - **Build Command:** `npm run build` (default is fine)
   - **Output Directory:** `build` (default)
   - **Install Command:** `npm install`
   - Click "Environment Variables" to expand
   - Add:
     ```
     Variable Name: REACT_APP_API_URL
     Value: https://your-backend-url.vercel.app
     ```
   - Click "Deploy"

4. **Verify Frontend Deployment:**
   - Wait for build to complete (~3-5 minutes)
   - Click "Visit" to open your frontend
   - Copy your frontend URL

5. **Update Backend Client URL (if needed):**
   - Go back to backend project Settings → Environment Variables
   - Update `CLIENT_URL` to your frontend URL
   - Redeploy backend

### Step 5: Enable Auto-Deployments

Auto-deployments are **already enabled** by default when you connect GitHub!

**How it works:**

- Push code to GitHub main branch → Automatic deployment starts
- You'll see build progress in Vercel Dashboard
- Once complete, live site updates instantly

## 🔄 Automatic Deployment Workflow

```
Code Changes
    ↓
Push to GitHub (git push origin main)
    ↓
Vercel detects changes
    ↓
Builds project automatically
    ↓
Runs tests & validation
    ↓
Deploys to production
    ↓
Live site updates
```

## 📝 Environment Variables Setup Summary

### Backend (Vercel Dashboard → Backend Project → Settings → Environment Variables)

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET = your_secure_secret_key_here
OWNER_REGISTRATION_CODE = portfolio2024secret
CLIENT_URL = https://your-frontend-name.vercel.app
NODE_ENV = production
```

### Frontend (Vercel Dashboard → Frontend Project → Settings → Environment Variables)

```
REACT_APP_API_URL = https://your-backend-name.vercel.app
```

## 🔗 After Deployment

You'll have:

- **Frontend URL:** `https://your-frontend-name.vercel.app`
- **Backend URL:** `https://your-backend-name.vercel.app`
- **GitHub Repository:** `https://github.com/YOUR_USERNAME/portfolio-fullstack`

## ✅ Testing Your Deployment

1. **Visit Frontend URL** - Should load your portfolio
2. **Test Login** - Try logging in as owner
3. **Test Projects** - Add, edit, delete projects
4. **Test Certificates** - Add, edit, delete certificates
5. **Test Resume Download** - Download resume
6. **Check API** - Visit `https://your-backend-url/api/health`
   - Should return: `{"status":"API is running"}`

## 🔐 Security Tips

✅ **Do's:**

- Store all secrets in Vercel Environment Variables (not in code)
- Use long, complex JWT_SECRET
- Keep GitHub repo secure (or make it private)
- Enable two-factor authentication on GitHub & Vercel
- Regularly update dependencies

❌ **Don'ts:**

- Don't commit `.env` files to GitHub
- Don't expose API URLs in client-side code (already handled with env vars)
- Don't share environment variable values
- Don't use simple passwords

## 🐛 Troubleshooting

### Build Fails

- Check build logs in Vercel Dashboard → Deployments
- Run `npm run build` locally to test
- Verify all dependencies in package.json

### API Not Connecting

- Verify `REACT_APP_API_URL` in frontend env vars
- Verify `CLIENT_URL` in backend env vars
- Check CORS configuration in backend

### 404 on API Routes

- Ensure backend uses correct routes
- Check `vercel.json` configuration
- Verify MongoDB connection

### Login Not Working

- Check `MONGODB_URI` is correct
- Verify `JWT_SECRET` matches in all places
- Check MongoDB Atlas allows Vercel IP

## 📊 Deployment Checklist

- [ ] GitHub account created
- [ ] GitHub repo created and code pushed
- [ ] Vercel account created
- [ ] Backend project created in Vercel
- [ ] Backend environment variables added
- [ ] Backend deployed successfully
- [ ] Frontend project created in Vercel
- [ ] Frontend environment variables added
- [ ] Frontend deployed successfully
- [ ] Updated backend CLIENT_URL to frontend
- [ ] All features tested (login, CRUD, downloads)

## 🔄 Future Deployments

**Every time you push to GitHub:**

1. Make changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
3. Vercel automatically deploys
4. Check Vercel Dashboard for status
5. Visit your live site to verify

## 🎯 Next Steps

1. **Monitor Deployments:**
   - Enable email notifications in Vercel Settings
   - Check deployment status regularly

2. **Custom Domain (Optional):**
   - In Vercel Dashboard → Settings → Domains
   - Add your custom domain
   - Update DNS records

3. **Database Backups:**
   - MongoDB Atlas → Backup & Restore
   - Enable automated backups

4. **Performance Monitoring:**
   - Use Vercel Analytics
   - Monitor response times
   - Check error rates

## 📚 Useful Links

- **Vercel Docs:** https://vercel.com/docs
- **GitHub Desktop:** https://desktop.github.com (optional GUI)
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **JWT Debugger:** https://jwt.io

---

**Questions?** Check Vercel's GitHub integration docs: https://vercel.com/docs/git
