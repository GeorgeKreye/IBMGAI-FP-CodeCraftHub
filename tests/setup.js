/**
 * Setup utilities for in-memory MongoDB instance for testing
 */
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

/**
 * Sets up in-memory MongoDB and connects mongoose
 */
async function setupDB() {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

/**
 * Drops database, closes mongoose connection and stops MongoMemoryServer
 */
async function teardownDB() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
  }
}

/**
 * Clears all collections in the current mongoose connection
 */
async function clearDB() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    if (Object.prototype.hasOwnProperty.call(collections, key)) {
      await collections[key].deleteMany({});
    }
  }
}

module.exports = {
  setupDB,
  teardownDB,
  clearDB
};
