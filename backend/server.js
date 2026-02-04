const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Lazy Mongo connection per request (reused across invocations)
const uri = process.env.MONGODB_URI;
if (!uri) {
  // Surface error during initialization if not provided
  throw new Error('MONGODB_URI not set in environment variables');
}

async function ensureDbConnection() {
  if (mongoose.connection.readyState === 1) return;
  if (mongoose.connection.readyState === 2) return; // connecting
  await mongoose.connect(uri);
}

app.use(async (req, res, next) => {
  try {
    await ensureDbConnection();
    next();
  } catch (err) {
    console.error('MongoDB connection error:', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Routes
const projectsRouter = require('./routes/projects');
const skillsRouter = require('./routes/skills');
const contactRouter = require('./routes/contact');
const authRouter = require('./routes/auth');
const certificatesRouter = require('./routes/certificates');

app.use('/api/projects', projectsRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);
app.use('/api/certificates', certificatesRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running' });
});

// Do not call app.listen in serverless environments.
// Export the app as the handler for Vercel's Node runtime.
module.exports = app;
