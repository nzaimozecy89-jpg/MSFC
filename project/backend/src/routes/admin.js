const express = require('express');
const Admin = require('../models/Admin');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/admin/profile
// @access  Private - Get current admin profile
router.get('/profile', protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    res.json({
      success: true,
      data: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
        lastLogin: admin.lastLogin,
        createdAt: admin.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/admin/password
// @access  Private - Change password
router.put('/password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const admin = await Admin.findById(req.admin._id).select('+password');

    // Verify current password
    const isMatch = await admin.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'New passwords do not match' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/admin/stats
// @access  Private - Get dashboard statistics
router.get('/stats', protect, authorize('admin'), async (req, res) => {
  try {
    const TeamMember = require('../models/TeamMember');
    const News = require('../models/News');
    const Fixture = require('../models/Fixture');

    const teamCount = await TeamMember.countDocuments();
    const newsCount = await News.countDocuments({ status: 'published' });
    const fixtureCount = await Fixture.countDocuments();
    const upcomingFixtures = await Fixture.countDocuments({ status: 'upcoming' });

    res.json({
      success: true,
      data: {
        teamMembers: teamCount,
        publishedNews: newsCount,
        totalFixtures: fixtureCount,
        upcomingFixtures: upcomingFixtures
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
