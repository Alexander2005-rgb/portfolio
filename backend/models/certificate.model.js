const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  issuer: {
    type: String,
    required: true,
    trim: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  credentialId: {
    type: String,
    trim: true
  },
  credentialUrl: {
    type: String,
    trim: true
  },
  certificateUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['Web Development', 'Backend', 'Cloud', 'DevOps', 'Database', 'Other'],
    default: 'Other'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Certificate', certificateSchema);
