const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const News = require('../models/News');
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
    cb(null, 'news-' + uniqueSuffix + path.extname(file.originalname));
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

// @route   GET /api/news
// @access  Public - Get all news
router.get('/', async (req, res) => {
  try {
    const { category, status, featured } = req.query;
    let query = { status: 'published' };

    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';

    const news = await News.find(query)
      .sort({ publishedAt: -1 })
      .limit(20);

    res.json({
      success: true,
      data: news,
      count: news.length
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/news/:id
// @access  Public - Get single news
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ success: false, message: 'News not found' });
    }

    // Increment views
    news.views += 1;
    await news.save();

    res.json({ success: true, data: news });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/news
// @access  Private - Create news
router.post('/', protect, authorize('admin', 'moderator'), upload.single('image'), async (req, res) => {
  try {
    req.body.author = req.admin.email;

    // Handle file upload
    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`;
    }

    if (req.body.status === 'published') {
      req.body.publishedAt = new Date();
    }

    const news = await News.create(req.body);

    res.status(201).json({
      success: true,
      message: 'News created successfully',
      data: news
    });
  } catch (err) {
    // Clean up uploaded file if database operation fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/news/:id
// @access  Private - Update news
router.put('/:id', protect, authorize('admin', 'moderator'), upload.single('image'), async (req, res) => {
  try {
    let news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ success: false, message: 'News not found' });
    }

    // Handle file upload - delete old file if new one is uploaded
    if (req.file) {
      // Delete old file if it exists
      if (news.image && news.image.startsWith('/uploads/')) {
        const oldFilePath = path.join(uploadsDir, path.basename(news.image));
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      req.body.image = `/uploads/${req.file.filename}`;
    }

    // If changing to published and not already published
    if (req.body.status === 'published' && news.status !== 'published') {
      req.body.publishedAt = new Date();
    }

    news = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      message: 'News updated successfully',
      data: news
    });
  } catch (err) {
    // Clean up uploaded file if database operation fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/news/:id
// @access  Private - Delete news
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);

    if (!news) {
      return res.status(404).json({ success: false, message: 'News not found' });
    }

    res.json({
      success: true,
      message: 'News deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
