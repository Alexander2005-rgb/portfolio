const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error('MONGODB_URI not found in environment variables');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/certificates', require('./routes/certificates'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running' });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
