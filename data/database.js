// Importing the mongodb module
const mongodb = require('mongodb');

// Getting the MongoClient from the mongodb module
const { MongoClient } = mongodb;

// Variable to hold the database connection
let database;

// Function to connect to the database
async function connectToDatabase() {
  // Connecting to the MongoDB server
  const client = await MongoClient.connect('mongodb://localhost:27017');
  // Selecting the 'online-shop' database and storing the connection in the 'database' variable
  database = client.db('online-shop');
}

// Function to get the database connection
function getDb() {
  // If the database connection is not established, throw an error
  if (!database) {
    throw new Error('You must connect first!');
  }
  // Return the database connection
  return database;
}

// Exporting the functions
module.exports = {
  // Function to connect to the database
  connectToDatabase,
  // Function to get the database connection
  getDb,
};
