const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  caption: {
    type: String,
    required: true,
    maxlength: 300
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  mediaUrl: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    default: null
  },
  fileSize: {
    type: Number,
    default: 0
  },
  uploadedBy: {
    type: String,
    default: 'Admin'
  },
  category: {
    type: String,
    enum: ['match', 'training', 'event', 'team', 'facility', 'general'],
    default: 'general'
  },
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active'
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
gallerySchema.index({ status: 1, uploadedAt: -1 });
gallerySchema.index({ category: 1, uploadedAt: -1 });

module.exports = mongoose.model('Gallery', gallerySchema);