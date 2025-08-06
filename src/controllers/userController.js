const userService = require('../services/userService');

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function register(req, res, next) {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

/**
 * Login user and return JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function login(req, res, next) {
  try {
    // Destructure email and password from request body
    const { email, password } = req.body;

    if (!email || !password) {
      // Basic validation for missing credentials
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const result = await userService.loginUser(email, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

/**
 * Get current logged-in user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function getProfile(req, res, next) {
  try {
    // Assuming req.user is set by authentication middleware
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized access.' });
    }
    res.json({ user: req.user });
  } catch (err) {
    next(err);
  }
}

// Export controller functions as an object
module.exports = {
  register,
  login,
  getProfile
};
