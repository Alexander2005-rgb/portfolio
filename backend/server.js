const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());

// Routes
const projectsRouter = require('./routes/projects');
const skillsRouter = require('./routes/skills');
const contactRouter = require('./routes/contact');
const authRouter = require('./routes/auth');
const certificatesRouter = require('./routes/certificates');

app.use('/projects', projectsRouter);
app.use('/skills', skillsRouter);
app.use('/contact', contactRouter);
app.use('/auth', authRouter);
app.use('/certificates', certificatesRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'API is running' });
});

// MongoDB Connection
const uri = process.env.ATLAS_URI;
if (!uri) {
    console.error('ATLAS_URI not set in environment variables');
    process.exit(1);
}

mongoose.connect(uri).then(() => {
    console.log("MongoDB database connection established successfully");
}).catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});

const connection = mongoose.connection;

connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
