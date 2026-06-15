const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Verify JWT token
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized - No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id);

    if (!req.admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    if (!req.admin.isActive) {
      return res.status(403).json({ success: false, message: 'Admin account is inactive' });
    }

    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Not authorized - Invalid token', error: err.message });
  }
};

// Check admin role
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({ success: false, message: 'Not authorized for this action' });
    }

    next();
  };
};
