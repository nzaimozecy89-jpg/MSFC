const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['player', 'coach', 'official', 'staff'],
    required: true
  },
  position: {
    type: String,
    default: null
  },
  number: {
    type: Number,
    default: null
  },
  dateOfBirth: {
    type: Date,
    default: null
  },
  nationality: {
    type: String,
    default: null
  },
  photo: {
    type: String, // URL or base64
    default: null
  },
  bio: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'injured'],
    default: 'active'
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
