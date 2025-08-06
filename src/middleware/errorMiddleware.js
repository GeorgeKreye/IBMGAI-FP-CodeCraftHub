const logger = require('../utils/logger');
  
// Centralized error handling middleware
function errorHandler(err, req, res, next) {
  logger.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ message });
}

module.exports = errorHandler;
