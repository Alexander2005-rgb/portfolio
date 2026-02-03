# ❓ Frequently Asked Questions

## Installation & Setup

### Q: Do I need to install MongoDB locally?

**A:** No! We're using MongoDB Atlas (cloud). Just create a free account at mongodb.com/cloud/atlas. If you prefer local MongoDB, that's also possible - just update the connection string.

### Q: What if npm install fails?

**A:** Try these steps:

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules

# Delete lock files
rm package-lock.json

# Install again
npm install
```

### Q: What Node.js version do I need?

**A:** Node 14+ is recommended. Check your version:

```bash
node --version
```

If you need to update: https://nodejs.org/

---

## Backend Questions

### Q: How do I add HTTPS to the backend?

**A:** When deploying to production (Heroku, Railway, etc.), they automatically handle HTTPS. For local development, HTTP is fine.

### Q: Can I change the port 5000?

**A:** Yes! Update in `backend/.env`:

```env
PORT=8000
```

Then update frontend's `REACT_APP_API_URL` to match.

### Q: What if I get "Port 5000 already in use"?

**A:**

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Q: How do I add more API endpoints?

**A:** Create a new route file in `backend/routes/`:

```javascript
// backend/routes/newroute.js
const router = require("express").Router();

router.route("/").get((req, res) => {
  res.json({ message: "Hello" });
});

module.exports = router;

// Then in server.js:
const newRouter = require("./routes/newroute");
app.use("/newroute", newRouter);
```

### Q: How do I add database authentication?

**A:** Add to `backend/server.js`:

```javascript
// Add a simple authentication middleware
app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});
```

---

## Frontend Questions

### Q: How do I change the color scheme?

**A:** Find all CSS files and replace the gradient colors:

- From: `#667eea` and `#764ba2`
- To: Your preferred colors

Or use a find-and-replace in your editor:

- Files: `src/components/*.css` and `App.css`
- Find: `#667eea`
- Replace: `#yourcolor`

### Q: How do I add a new component?

**A:**

```javascript
// 1. Create component
// src/components/MyComponent.js
import React from 'react';
import './MyComponent.css';

function MyComponent() {
  return <div>My Component</div>;
}

export default MyComponent;

// 2. Import in App.js
import MyComponent from './components/MyComponent';

// 3. Use in App.js
<MyComponent />

// 4. Add styling
// src/components/MyComponent.css
.my-component { /* styles */ }
```

### Q: How do I add images to projects?

**A:** Update project data with image URL:

```javascript
{
  "title": "My Project",
  "imageUrl": "https://via.placeholder.com/400x250",
  // ...
}
```

Use services like:

- Unsplash: https://unsplash.com
- Pexels: https://pexels.com
- Your own hosting

### Q: How do I remove Bootstrap?

**A:**

1. Remove from `package.json`: `"bootstrap": "^5.3.8"`
2. Remove import from `App.js`
3. Run `npm install`

All our components use custom CSS anyway!

### Q: How do I add dark mode?

**A:** Add CSS variables:

```css
/* In App.css */
:root {
  --primary-color: #667eea;
  --bg-color: white;
}

@media (prefers-color-scheme: dark) {
  :root {
    --primary-color: #764ba2;
    --bg-color: #1a1a1a;
  }
}

body {
  background: var(--bg-color);
}
```

---

## Database & API

### Q: How do I view my MongoDB data?

**A:** Use MongoDB Atlas UI:

1. Go to mongodb.com/cloud/atlas
2. Login
3. Go to Collections
4. View your data

Or use MongoDB Compass (desktop app).

### Q: How do I backup my data?

**A:** In MongoDB Atlas:

1. Collections → Select collections
2. Export as JSON/CSV
3. Save locally

### Q: Can I export data to CSV?

**A:** Yes, in MongoDB Atlas:

1. Collections → Export
2. Choose format (CSV, JSON)
3. Download

### Q: How do I reset the database?

**A:** ⚠️ **Caution** - This deletes all data:

1. MongoDB Atlas → Collections
2. Drop collection
3. Collections are recreated on next API call

### Q: How do I add validation to forms?

**A:** In `Contact.js`:

```javascript
const handleSubmit = (e) => {
  e.preventDefault();

  // Validation
  if (!formData.name || formData.name.length < 3) {
    setError("Name must be at least 3 characters");
    return;
  }

  // If validation passes, submit
  // ...
};
```

---

## Deployment

### Q: Which hosting is cheapest?

**A:**

- Frontend: Vercel/Netlify (Free with custom domain)
- Backend: Render/Railway (Free tier available)
- Database: MongoDB Atlas (Free tier available)
- **Total**: ~$0/month (free tier) or $10-20/month (paid)

### Q: What's the easiest deployment method?

**A:**

1. **Frontend**: Vercel (auto-deploy from GitHub)
2. **Backend**: Railway (auto-deploy from GitHub)
3. **Database**: MongoDB Atlas (already cloud-based)

No manual deployment needed with Git!

### Q: Can I deploy to AWS?

**A:** Yes, but it's more complex:

- EC2 for backend
- S3 for frontend
- RDS/DynamoDB for database

Consider using Railway or Render first - simpler!

### Q: How do I setup custom domain?

**A:**

1. Buy domain (GoDaddy, Namecheap, etc.)
2. Update DNS records (platform-specific)
3. Update `frontend/.env` with new URL
4. Redeploy

### Q: How often should I backup?

**A:**

- Daily for production
- Weekly for development
- Use MongoDB Atlas automated backups

### Q: How do I monitor my app?

**A:**

- Vercel: Analytics dashboard
- Railway: Logs and metrics
- MongoDB: Cloud monitoring
- Free alternative: Sentry.io

---

## Customization

### Q: How do I change the name throughout the site?

**A:** Find and replace in these files:

- `Hero.js` - Main title
- `Footer.js` - Copyright name
- `Contact.js` - Contact person name
- `package.json` - Project name

### Q: How do I add a new section?

**A:**

1. Create component in `src/components/`
2. Add to `App.js`
3. Add ID for scroll navigation:

```javascript
<section id="newsection">
```

### Q: Can I reorder sections?

**A:** Yes! In `App.js`, reorder the components:

```javascript
<Hero />
<Skills />           {/* Moved up */}
<ProjectsList />
<Contact />
```

### Q: How do I hide/show sections?

**A:** Comment out in `App.js`:

```javascript
{
  /* <Skills /> */
}
{
  /* This section is hidden */
}
```

---

## Troubleshooting

### Q: My frontend can't reach the backend API

**A:** Check:

1. Backend is running: `http://localhost:5000`
2. `REACT_APP_API_URL` is correct in `.env`
3. CORS is enabled in backend
4. Check browser console for errors

### Q: I see "Cannot GET /"

**A:** Your backend is running but:

- Try accessing an endpoint: `http://localhost:5000/api/health`
- If health check fails, backend isn't responding
- Restart backend server

### Q: Form submission fails silently

**A:**

1. Check browser console for errors
2. Check network tab in DevTools
3. Verify API endpoint is correct
4. Check MongoDB connection in backend logs

### Q: Images don't load

**A:**

1. Check image URL is valid
2. Try pasting URL in browser
3. Check CORS allows image domains
4. Use HTTPS images on HTTPS sites

### Q: Styles look broken on mobile

**A:**

1. Clear browser cache
2. Check media queries in CSS
3. Use Chrome DevTools to test responsiveness
4. Restart dev server

### Q: My changes don't appear

**A:**

1. Check file was saved
2. Refresh browser (Ctrl+Shift+R for hard refresh)
3. Clear browser cache
4. Check console for errors

---

## Performance

### Q: How do I make my site faster?

**A:**

1. Optimize images (compress with TinyPNG)
2. Use lazy loading for images
3. Remove unused CSS/JavaScript
4. Enable gzip compression
5. Use CDN for assets

### Q: How do I reduce bundle size?

**A:**

1. Remove Bootstrap if not used
2. Use dynamic imports
3. Code splitting
4. Tree shaking in build

### Q: How do I analyze bundle size?

**A:**

```bash
npm install --save-dev webpack-bundle-analyzer
```

---

## SEO & Analytics

### Q: How do I improve SEO?

**A:** Add to `frontend/public/index.html`:

```html
<meta name="description" content="Your portfolio description" />
<meta name="keywords" content="developer, portfolio, projects" />
<meta property="og:title" content="Your Name - Portfolio" />
```

### Q: How do I add Google Analytics?

**A:**

1. Create Google Analytics account
2. Get tracking ID
3. Add to `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_ID");
</script>
```

---

## Additional Resources

### Learning Resources

- [React Documentation](https://react.dev)
- [Express Guide](https://expressjs.com)
- [MongoDB University](https://university.mongodb.com)
- [MDN Web Docs](https://developer.mozilla.org)
- [CSS Tricks](https://css-tricks.com)

### Tools & Services

- [Postman](https://postman.com) - API testing
- [GitHub](https://github.com) - Code hosting
- [Vercel](https://vercel.com) - Frontend hosting
- [MongoDB Atlas](https://mongodb.com/cloud/atlas) - Database
- [Heroku](https://heroku.com) - Backend hosting

### Communities

- [Stack Overflow](https://stackoverflow.com)
- [Reddit r/reactjs](https://reddit.com/r/reactjs)
- [Dev.to](https://dev.to)
- [GitHub Discussions](https://github.com/discussions)

---

## Still Have Questions?

If your question isn't answered here:

1. **Check the documentation files**:
   - README.md
   - QUICKSTART.md
   - CONFIG.md
   - DEPLOYMENT.md

2. **Search online**:
   - Stack Overflow
   - GitHub Issues
   - Official documentation

3. **Debug using**:
   - Browser DevTools (F12)
   - Console logs
   - Network tab

4. **Ask the community**:
   - Stack Overflow
   - Reddit
   - GitHub Discussions

---

**Good luck with your portfolio! 🚀**

Feel free to experiment and customize - that's the fun part!
