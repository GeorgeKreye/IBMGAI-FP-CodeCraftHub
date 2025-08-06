/**
 * Service layer for user-related operations
 */
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Registers a new user
 * @param {Object} userData - User registration data
 * @returns {Object} Created user object without password
 * @throws {Error} If email is already registered
 */
async function registerUser(userData) {
  // Check if user with the same email already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    const error = new Error('Email already registered');
    error.statusCode = 400;
    throw error;
  }

  // Create new user instance and save to DB
  const user = new User(userData);
  await user.save();

  // Convert to plain object and remove password before returning
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
}

/**
 * Authenticates user credentials and returns JWT token
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} Object containing authenticated user (without password) and JWT token
 * @throws {Error} If authentication fails
 */
async function loginUser(email, password) {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // Verify password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // Prepare JWT payload
  const payload = { id: user._id, role: user.role };

  // Sign JWT token
  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });

  // Prepare user object to return
  const userObj = user.toObject();
  delete userObj.password;

  return { user: userObj, token };
}

// Export service functions
module.exports = {
  registerUser,
  loginUser
};
