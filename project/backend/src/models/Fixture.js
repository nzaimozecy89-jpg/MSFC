const mongoose = require('mongoose');

const fixtureSchema = new mongoose.Schema({
  opponent: {
    type: String,
    required: true,
    trim: true
  },
  competition: {
    type: String,
    required: true,
    enum: ['league', 'cup', 'friendly', 'playoff'],
    default: 'league'
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String, // HH:MM format
    default: '15:00'
  },
  venue: {
    type: String,
    required: true,
    trim: true
  },
  isHome: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'live', 'completed', 'postponed', 'cancelled'],
    default: 'upcoming'
  },
  result: {
    msfc_score: {
      type: Number,
      default: null
    },
    opponent_score: {
      type: Number,
      default: null
    }
  },
  lineup: {
    type: String, // Formation or detailed lineup
    default: null
  },
  highlights: {
    type: String, // URL to highlights
    default: null
  },
  notes: {
    type: String,
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

module.exports = mongoose.model('Fixture', fixtureSchema);
