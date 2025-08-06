/**
 * Main application setup for Express server
 */
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const logger = require('./utils/logger');

const app = express();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Log each incoming request for debugging and monitoring
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// User-related routes
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Centralized error handling middleware (should be last middleware)
app.use(errorHandler);

module.exports = app;
