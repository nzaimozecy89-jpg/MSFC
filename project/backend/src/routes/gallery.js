const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Gallery = require('../models/Gallery');
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
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images and videos
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  }
});

// @route   GET /api/gallery
// @access  Public - Get all gallery items
router.get('/', async (req, res) => {
  try {
    const { category, status, featured, limit = 50 } = req.query;
    let query = { status: 'active' };

    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';

    const gallery = await Gallery.find(query)
      .sort({ uploadedAt: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: gallery,
      count: gallery.length
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/gallery/:id
// @access  Public - Get single gallery item
router.get('/:id', async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    // Increment views
    item.views += 1;
    await item.save();

    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/gallery
// @access  Private - Upload gallery item
router.post('/', protect, authorize('admin', 'moderator'), upload.single('media'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const { title, caption, category, featured } = req.body;

    // Determine media type
    const mediaType = req.file.mimetype.startsWith('image/') ? 'image' : 'video';

    // Create gallery item
    const galleryItem = await Gallery.create({
      title,
      caption,
      mediaType,
      mediaUrl: `/uploads/${req.file.filename}`,
      fileSize: req.file.size,
      uploadedBy: req.admin.email,
      category: category || 'general',
      featured: featured === 'true'
    });

    res.status(201).json({
      success: true,
      message: 'Gallery item uploaded successfully',
      data: galleryItem
    });
  } catch (err) {
    // Clean up uploaded file if database operation fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/gallery/:id
// @access  Private - Update gallery item
router.put('/:id', protect, authorize('admin', 'moderator'), async (req, res) => {
  try {
    let item = await Gallery.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      message: 'Gallery item updated successfully',
      data: item
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/gallery/:id
// @access  Private - Delete gallery item
router.delete('/:id', protect, authorize('admin', 'moderator'), async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    // Delete file from filesystem
    const filePath = path.join(uploadsDir, path.basename(item.mediaUrl));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await Gallery.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Gallery item deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;