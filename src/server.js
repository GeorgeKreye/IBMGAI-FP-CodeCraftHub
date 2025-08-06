const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');
const logger = require('./utils/logger');

async function startServer() {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info('Connected to MongoDB');

    app.listen(config.port, () => {
      logger.info(`User Service running on port ${config.port}`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
}

startServer();