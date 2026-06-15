const express = require('express');
const Fixture = require('../models/Fixture');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/fixtures
// @access  Public - Get all fixtures
router.get('/', async (req, res) => {
  try {
    const { status, competition, sort } = req.query;
    let query = {};

    if (status) query.status = status;
    if (competition) query.competition = competition;

    const fixtures = await Fixture.find(query)
      .sort(sort === 'past' ? { date: -1 } : { date: 1 });

    res.json({
      success: true,
      data: fixtures,
      count: fixtures.length
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/fixtures/:id
// @access  Public - Get single fixture
router.get('/:id', async (req, res) => {
  try {
    const fixture = await Fixture.findById(req.params.id);

    if (!fixture) {
      return res.status(404).json({ success: false, message: 'Fixture not found' });
    }

    res.json({ success: true, data: fixture });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/fixtures
// @access  Private - Create fixture
router.post('/', protect, authorize('admin', 'moderator'), async (req, res) => {
  try {
    const fixture = await Fixture.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Fixture created successfully',
      data: fixture
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/fixtures/:id
// @access  Private - Update fixture
router.put('/:id', protect, authorize('admin', 'moderator'), async (req, res) => {
  try {
    let fixture = await Fixture.findById(req.params.id);

    if (!fixture) {
      return res.status(404).json({ success: false, message: 'Fixture not found' });
    }

    fixture = await Fixture.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      message: 'Fixture updated successfully',
      data: fixture
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/fixtures/:id
// @access  Private - Delete fixture
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const fixture = await Fixture.findByIdAndDelete(req.params.id);

    if (!fixture) {
      return res.status(404).json({ success: false, message: 'Fixture not found' });
    }

    res.json({
      success: true,
      message: 'Fixture deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
