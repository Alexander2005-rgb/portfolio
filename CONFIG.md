# 🔧 Configuration Guide

## Environment Variables Setup

### Backend Configuration (.env)

Located in: `backend/.env`

```env
# Server Port
PORT=5000

# MongoDB Connection String
# Get this from MongoDB Atlas: https://www.mongodb.com/cloud/atlas
ATLAS_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

#### How to Get MongoDB Connection String:

1. **Go to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
2. **Sign up/Login** with your account
3. **Create a Cluster** (Free tier available)
4. **Click "Connect"** button
5. **Select "Connect your application"**
6. **Choose Node.js** driver
7. **Copy the connection string**
8. **Replace `<password>` and `<username>`** with your database credentials
9. **Paste in `.env`** as `ATLAS_URI`

Example:

```env
ATLAS_URI=mongodb+srv://john_doe:mySecurePassword123@portfolio-cluster.mongodb.net/portfolio-db?retryWrites=true&w=majority
```

### Frontend Configuration (.env)

Located in: `frontend/.env`

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:5000
```

#### For Production:

```env
REACT_APP_API_URL=https://your-backend-api.com
```

---

## MongoDB Atlas Setup (Step-by-Step)

### 1. Create Account

- Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Click "Sign Up"
- Create account with email or Google

### 2. Create Organization

- Choose organization name
- Create

### 3. Create Project

- Click "New Project"
- Name your project (e.g., "Portfolio")
- Create Project

### 4. Create Cluster

- Click "Build a Database"
- Select **Free** tier (M0)
- Choose region (closest to your location)
- Click "Create"
- Wait 3-5 minutes for cluster creation

### 5. Setup Security

- **Username & Password**: Create credentials
  - Username: `portfolio_user`
  - Password: Generate secure password
  - Save these credentials
- **IP Whitelist**:
  - Add `0.0.0.0/0` (allows all IPs - development only)
  - For production: Add your server's specific IP

### 6. Get Connection String

- Click "Connect" on cluster
- Choose "Drivers"
- Select Node.js version
- Copy connection string
- Replace `<password>` with your password

### 7. Create Database

- In MongoDB Atlas, go to "Collections"
- Click "Create Database"
- Database name: `portfolio`
- Collection name: `projects` (or auto-create via application)

---

## Project Models

### Project Collection

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  imageUrl: String,
  projectUrl: String,
  category: String (optional, for filtering),
  createdAt: Date,
  updatedAt: Date
}
```

### Skill Collection

```javascript
{
  _id: ObjectId,
  name: String,
  category: String,      // "Frontend", "Backend", "Tools"
  icon: String,         // Emoji or icon name
  level: String,        // "Beginner", "Intermediate", "Advanced", "Expert"
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  read: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Configuration

### Base URL

**Development**: `http://localhost:5000`
**Production**: `https://your-api-domain.com`

### CORS Configuration

In `backend/server.js`:

```javascript
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);
```

Change `CLIENT_URL` in `.env` for different origins.

### Axios Configuration (Frontend)

In `frontend/src/components/*.js`:

```javascript
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
axios.get(`${apiUrl}/projects`);
```

---

## Development vs Production

### Development (.env)

```env
PORT=5000
ATLAS_URI=mongodb+srv://user:pass@dev-cluster.mongodb.net/portfolio-dev
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

### Production (.env)

```env
PORT=5000
ATLAS_URI=mongodb+srv://user:pass@prod-cluster.mongodb.net/portfolio
CLIENT_URL=https://yourportfolio.com
NODE_ENV=production
```

---

## Port Configuration

### Default Ports

- **Backend**: 5000 (Node.js/Express)
- **Frontend**: 3000 (React)

### Change Backend Port

Edit `backend/.env`:

```env
PORT=8000  # Changed from 5000
```

Update `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:8000
```

---

## Database Configuration

### Local MongoDB (Optional)

If you want to use local MongoDB instead of Atlas:

1. **Install MongoDB**: https://docs.mongodb.com/manual/installation/
2. **Start MongoDB service**:

   ```bash
   # Windows
   net start MongoDB

   # Mac
   brew services start mongodb-community

   # Linux
   sudo service mongod start
   ```

3. **Update .env**:
   ```env
   ATLAS_URI=mongodb://localhost:27017/portfolio
   ```

---

## NPM Scripts

### Backend

```bash
npm start      # Run with nodemon (auto-restart on changes)
npm run dev    # Run without nodemon
```

### Frontend

```bash
npm start      # Start development server
npm run build  # Build for production
npm test       # Run tests
npm run eject  # Eject from react-scripts (⚠️ irreversible)
```

---

## Troubleshooting Configuration

### Issue: Cannot connect to MongoDB

**Solution**:

- Check connection string format
- Verify credentials are correct
- Whitelist your IP in MongoDB Atlas
- Ensure network is available

### Issue: CORS errors

**Solution**:

- Verify `CLIENT_URL` in backend `.env`
- Check frontend is using correct `REACT_APP_API_URL`
- Restart both servers

### Issue: Port already in use

**Solution**:

```bash
# Find process using port
lsof -i :5000          # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill process (Windows)
taskkill /PID <PID> /F
```

### Issue: .env not loading

**Solution**:

- Restart development server
- Check .env file is in correct directory
- Restart IDE/terminal

---

## Security Best Practices

⚠️ **IMPORTANT FOR PRODUCTION**:

1. **Never commit `.env` files**
   - Already in `.gitignore`

2. **Use strong passwords**
   - MongoDB password: 12+ characters, mixed case, numbers, symbols

3. **Restrict IP Whitelist**
   - Don't use `0.0.0.0/0` in production
   - Add specific server IPs only

4. **Environment variables on server**
   - Use platform-specific methods:
     - Heroku: Config Vars
     - Vercel: Environment Variables
     - Railway: Variables

5. **HTTPS in production**
   - Use SSL certificates
   - Update `CLIENT_URL` to https://

6. **API rate limiting**
   - Consider adding express-rate-limit

7. **Input validation**
   - Validate all incoming data
   - Sanitize user inputs

---

**Your portfolio is now fully configured! 🎉**
