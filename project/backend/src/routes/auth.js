const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const router = express.Router();

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// @route   POST /api/auth/register
// @access  Private (only for initial setup, typically disabled in production)
router.post('/register', async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // Validation
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    // Check if admin exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ success: false, message: 'Admin already exists' });
    }

    // Create admin
    admin = await Admin.create({ email, password });

    // Generate token
    const token = generateToken(admin._id);

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      token,
      admin: { id: admin._id, email: admin.email, role: admin.role }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Check for admin
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (!admin.isActive) {
      return res.status(403).json({ success: false, message: 'Admin account is inactive' });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = generateToken(admin._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: { id: admin._id, email: admin.email, role: admin.role }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/auth/verify
// @access  Private
router.get('/verify', require('../middleware/auth').protect, (req, res) => {
  res.json({
    success: true,
    message: 'Token is valid',
    admin: { id: req.admin._id, email: req.admin.email, role: req.admin.role }
  });
});

module.exports = router;
