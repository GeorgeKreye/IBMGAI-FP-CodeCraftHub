/**
 * Server startup and MongoDB connection
 */
const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');
const logger = require('./utils/logger');

async function startServer() {
  try {
    // Connect to MongoDB with options
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info('Connected to MongoDB successfully');

    // Start Express server
    const port = config.port || 3000;
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1); // Exit process with failure
  }
}

startServer();

// Handle graceful shutdown
process.on('SIGINT', async () => {
  logger.info('SIGINT received, closing MongoDB connection');
  try {
    await mongoose.disconnect();
    logger.info('MongoDB connection closed');
    process.exit(0);
  } catch (err) {
    logger.error('Error during MongoDB disconnection', err);
    process.exit(1);
  }
});

process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, closing MongoDB connection');
  try {
    await mongoose.disconnect();
    logger.info('MongoDB connection closed');
    process.exit(0);
  } catch (err) {
    logger.error('Error during MongoDB disconnection', err);
    process.exit(1);
  }
});
