const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true,
    maxlength: 200
  },
  category: {
    type: String,
    enum: ['match', 'transfer', 'injury', 'achievement', 'announcement', 'general'],
    default: 'general'
  },
  featured: {
    type: Boolean,
    default: false
  },
  image: {
    type: String, // URL or base64
    default: null
  },
  author: {
    type: String,
    default: 'Admin'
  },
  views: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: {
    type: Date,
    default: null
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

module.exports = mongoose.model('News', newsSchema);
