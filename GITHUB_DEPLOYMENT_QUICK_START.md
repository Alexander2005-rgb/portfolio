# GitHub & Vercel Quick Setup

## 🚀 Quick Start (5 Minutes)

### 1. Push to GitHub

```bash
cd d:\porftfolip
git init
git add .
git commit -m "Portfolio - ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/portfolio-fullstack.git
git branch -M main
git push -u origin main
```

### 2. Connect Backend to Vercel

- Go to https://vercel.com/dashboard
- Click "Add New" → "Project"
- Select your GitHub repo
- **Root Directory:** backend
- **Add Environment Variables:**
  - `MONGODB_URI`: your_mongodb_uri
  - `JWT_SECRET`: your_secret_key
  - `OWNER_REGISTRATION_CODE`: portfolio2024secret
  - `CLIENT_URL`: your_frontend_url (add later)
- Click "Deploy"

### 3. Connect Frontend to Vercel

- Go to https://vercel.com/dashboard
- Click "Add New" → "Project"
- Select your GitHub repo
- **Root Directory:** frontend
- **Add Environment Variable:**
  - `REACT_APP_API_URL`: your_backend_url
- Click "Deploy"

### 4. Update Backend Client URL

- Go to backend project → Settings → Environment Variables
- Update `CLIENT_URL` to your frontend URL
- Redeploy

## ✅ Done!

Now every time you push to GitHub, Vercel auto-deploys! 🎉

```bash
git push origin main  # Auto-deploys both backend and frontend
```

---

**For detailed instructions:** See `GITHUB_VERCEL_DEPLOYMENT.md`
