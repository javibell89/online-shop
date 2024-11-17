// Importing required modules
const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');

// Function to create a session store with MongoDB
function createSessionStore() {
  // Initializing MongoDBStore with expressSession
  const MongoDBStore = mongoDbStore(expressSession);

  // Creating a new MongoDBStore with the specified configuration
  // Returning the created store
  return new MongoDBStore({
    uri: 'mongodb://localhost:27017/', // MongoDB connection string
    databaseName: 'online-shop', // Database name
    collection: 'sessions', // Collection name
  });
}

// Function to create a session configuration
function createSessionConfig() {
  // Returning the session configuration
  return {
    secret: 'esSecreto-nolopuedesaber', // Secret key for session
    resave: false, // Forces the session to be saved back to the session store
    saveUninitialized: false, // Forces a session that is "uninitialized" to be saved to the store
    store: createSessionStore(), // Session store instance
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // Cookie expiration time (1 week)
    },
  };
}

// Exporting the createSessionConfig function
module.exports = createSessionConfig;
