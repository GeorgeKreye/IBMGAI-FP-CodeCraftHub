const userService = require('../services/userService');

/**
 * Register a new user
 */
async function register(req, res, next) {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
}

/**
 * Login user and return JWT token
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

/**
 * Get current logged-in user profile
 */
async function getProfile(req, res, next) {
  try {
    res.json({ user: req.user });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
  getProfile
};
