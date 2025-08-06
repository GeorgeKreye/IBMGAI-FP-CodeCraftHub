const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Registers a new user
 * @param {Object} userData
 * @returns {Object} created user without password
 */
async function registerUser(userData) {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    const error = new Error('Email already registered');
    error.statusCode = 400;
    throw error;
  }

  const user = new User(userData);
  await user.save();

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
}

/**
 * Authenticates user and returns JWT token
 * @param {string} email
 * @param {string} password
 * @returns {Object} { user, token }
 */
async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const payload = { id: user._id, role: user.role };
  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });

  const userObj = user.toObject();
  delete userObj.password;

  return { user: userObj, token };
}

module.exports = {
  registerUser,
  loginUser
};
