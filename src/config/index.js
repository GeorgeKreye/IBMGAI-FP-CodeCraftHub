require('dotenv').config();

// Configuration object for application settings
const config = {
  port: process.env.PORT || 3000, // Server port
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/user-service', // MongoDB connection string
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret', // JWT secret key
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h' // JWT expiration time
};

module.exports = config;
