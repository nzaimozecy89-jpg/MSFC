const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const TeamMember = require('../models/TeamMember');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'team-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for team photos
  }
});

// @route   GET /api/team
// @access  Public - Get all team members
router.get('/', async (req, res) => {
  try {
    const { role, status } = req.query;
    let query = {};

    if (role) query.role = role;
    if (status) query.status = status;

    const members = await TeamMember.find(query).sort({ joinedDate: -1 });

    res.json({
      success: true,
      data: members,
      count: members.length
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/team/:id
// @access  Public - Get single team member
router.get('/:id', async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    res.json({ success: true, data: member });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/team
// @access  Private - Create team member
router.post('/', protect, authorize('admin', 'moderator'), upload.single('photo'), async (req, res) => {
  try {
    // Handle file upload
    if (req.file) {
      req.body.photo = `/uploads/${req.file.filename}`;
    }

    const member = await TeamMember.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Team member created successfully',
      data: member
    });
  } catch (err) {
    // Clean up uploaded file if database operation fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(400).json({ success: false, message: err.message });
  }
});
      success: true,
      message: 'Team member added successfully',
      data: member
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/team/:id
// @access  Private - Update team member
router.put('/:id', protect, authorize('admin', 'moderator'), async (req, res) => {
  try {
    let member = await TeamMember.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      message: 'Team member updated successfully',
      data: member
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/team/:id
// @access  Private - Delete team member
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    res.json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
