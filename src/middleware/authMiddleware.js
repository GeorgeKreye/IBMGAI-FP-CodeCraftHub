const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/userModel');

/**
 * Middleware to protect routes by verifying JWT token
 * and attaching the authenticated user to the request object.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    // Extract token from 'Bearer <token>' format
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access token missing' });
    }

    // Verify token using JWT secret
    const decoded = jwt.verify(token, config.jwtSecret);

    // Find user by decoded token id, exclude password field
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid token: user not found' });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (err) {
    // Token verification failed or other errors
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}

// Export middleware function
module.exports = authenticateToken;
