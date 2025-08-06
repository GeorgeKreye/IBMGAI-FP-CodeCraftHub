const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const logger = require('./utils/logger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Error handling middleware
app.use(errorHandler);

// Log each request for debugging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

module.exports = app;
