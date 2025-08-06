const logger = require('../utils/logger');

/**
 * Centralized error handling middleware.
 * Logs the error and sends a JSON response with appropriate status code and message.
 *
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function errorHandler(err, req, res, next) {
  // Log the error details for debugging
  logger.error(err);

  // Use error's statusCode if available, otherwise default to 500
  const statusCode = err.statusCode || 500;

  // Use error's message if available, otherwise a generic message
  const message = err.message || 'Internal Server Error';

  // Send JSON response with status code and message
  res.status(statusCode).json({ message });
}

module.exports = errorHandler;
