// Importing the bcryptjs module for password hashing
const bcrypt = require('bcryptjs');
const mongodb = require('mongodb');

// Importing the database connection
const db = require('../data/database');

// Defining the User class
class User {
  // Constructor for the User class
  constructor(email, password, fullname, street, postal, city) {
    // Initializing the user properties from the provided data
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street,
      postal,
      city,
    };
  }

  static async findById(userId) {
    const uid = new mongodb.ObjectId(userId);

    return db
      .getDb()
      .collection('users')
      .findOne({ _id: uid }, { projection: { password: 0 } });
  }

  // Method to find a user with the same email
  getUserWithSameEmail() {
    return db.getDb().collection('users').findOne({ email: this.email });
  }

  // Method to check if a user with the same email already exists
  existsAlready() {
    return this.getUserWithSameEmail();
  }

  // Method to sign up a new user
  async signup() {
    // Hashing the user's password
    const hashedPassword = await bcrypt.hash(this.password, 12);

    // Inserting the new user into the database
    await db.getDb().collection('users').insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }

  // Method to check if a provided password matches the hashed password
  hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }
}

// Exporting the User class
module.exports = User;
