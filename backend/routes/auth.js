const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  });
}

// Register Owner (First Time Setup Only)
router.post('/register-owner', async (req, res) => {
  try {
    const { name, email, password, registrationCode } = req.body;

    // Check if owner already exists
    const ownerExists = await User.findOne({ role: 'owner' });
    if (ownerExists) {
      return res.status(400).json({ message: 'Owner account already exists. Use login instead.' });
    }

    // Check registration code (set this to your secure code)
    const OWNER_REGISTRATION_CODE = process.env.OWNER_REGISTRATION_CODE || 'portfolio2024secret';
    if (registrationCode !== OWNER_REGISTRATION_CODE) {
      return res.status(400).json({ message: 'Invalid registration code' });
    }

    // Check if email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'owner'
    });

    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Owner registered successfully',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Current User
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create User (Admin/Owner Only) - Via Postman or Admin Panel
router.post('/create-user', authenticateToken, async (req, res) => {
  try {
    // Only owner can create users
    if (req.userRole !== 'owner') {
      return res.status(403).json({ message: 'Only owner can create users' });
    }

    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    await newUser.save();

    res.status(201).json({
      message: 'User created successfully by owner',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete User (Admin/Owner Only)
router.delete('/delete-user/:userId', authenticateToken, async (req, res) => {
  try {
    // Only owner can delete users
    if (req.userRole !== 'owner') {
      return res.status(403).json({ message: 'Only owner can delete users' });
    }

    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Users (Admin/Owner Only)
router.get('/users', authenticateToken, async (req, res) => {
  try {
    // Only owner can view all users
    if (req.userRole !== 'owner') {
      return res.status(403).json({ message: 'Only owner can view users' });
    }

    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

// Export authenticateToken for use in other routes
router.authenticateToken = authenticateToken;
