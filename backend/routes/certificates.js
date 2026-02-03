const express = require('express');
const Certificate = require('../models/certificate.model');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.userId = user.id;
    req.userRole = user.role;
    next();
  });
};

// GET all certificates (public)
router.get('/', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ issueDate: -1 });
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching certificates', error: err.message });
  }
});

// GET certificate by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    res.json(certificate);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching certificate', error: err.message });
  }
});

// POST add new certificate (owner only)
router.post('/add', authenticateToken, async (req, res) => {
  try {
    // Check if user is owner
    if (req.userRole !== 'owner') {
      return res.status(403).json({ message: 'Only owner can add certificates' });
    }

    const { title, issuer, issueDate, credentialId, credentialUrl, certificateUrl, description, category } = req.body;

    // Validation
    if (!title || !issuer || !issueDate || !certificateUrl) {
      return res.status(400).json({ message: 'Title, issuer, issue date, and certificate URL are required' });
    }

    const newCertificate = new Certificate({
      title,
      issuer,
      issueDate,
      credentialId,
      credentialUrl,
      certificateUrl,
      description,
      category
    });

    const savedCertificate = await newCertificate.save();
    res.status(201).json({ 
      message: 'Certificate added successfully', 
      certificate: savedCertificate 
    });
  } catch (err) {
    res.status(500).json({ message: 'Error adding certificate', error: err.message });
  }
});

// POST update certificate (owner only)
router.post('/update/:id', authenticateToken, async (req, res) => {
  try {
    // Check if user is owner
    if (req.userRole !== 'owner') {
      return res.status(403).json({ message: 'Only owner can update certificates' });
    }

    const { title, issuer, issueDate, credentialId, credentialUrl, certificateUrl, description, category } = req.body;

    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      {
        title,
        issuer,
        issueDate,
        credentialId,
        credentialUrl,
        certificateUrl,
        description,
        category
      },
      { new: true, runValidators: true }
    );

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    res.json({ 
      message: 'Certificate updated successfully', 
      certificate 
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating certificate', error: err.message });
  }
});

// DELETE certificate (owner only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // Check if user is owner
    if (req.userRole !== 'owner') {
      return res.status(403).json({ message: 'Only owner can delete certificates' });
    }

    const certificate = await Certificate.findByIdAndDelete(req.params.id);

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    res.json({ 
      message: 'Certificate deleted successfully', 
      certificate 
    });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting certificate', error: err.message });
  }
});

module.exports = router;
