// Importing the mongodb module
const mongoDb = require('mongodb');

// Importing the database connection
const db = require('../data/database');

// Defining the Product class
class Product {
  // Constructor for the Product class
  constructor(productData) {
    // Initializing the product properties from the provided data
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price; // the + symbol force storing the value as a number
    this.description = productData.description;
    this.image = productData.image; // the name of the image file
    this.imagePath = `product-data/images/${productData.image}`; // path to the image file
    this.imageUrl = `/products/assets/images/${productData.image}`; // URL to access the image
    this.updateImageData();
    // If an id is provided, store it as a string
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  // Method to find a product by id
  static async findById(productId) {
    let prodId;
    try {
      // Trying to create an ObjectId from the provided id
      prodId = new mongoDb.ObjectId(productId);
    } catch (error) {
      // If an error occurs, set the error code to 404 and throw the error
      error.code = 404;
      throw error;
    }

    // Trying to find the product in the database
    const product = await db
      .getDb()
      .collection('products')
      .findOne({ _id: prodId });

    // If no product is found, throw an error
    if (!product) {
      const error = new Error('Product not found');
      error.code = 404;
      throw error;
    }
    // Return the found product
    return new Product(product);
  }

  // Method to find all products
  static async findAll() {
    // Getting all products from the database
    const products = await db.getDb().collection('products').find().toArray();

    // Returning the products as instances of the Product class
    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  // Method to update the image data for a product
  updateImageData() {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  // Method to save the product to the database
  async save() {
    // Creating a product data object from the product properties
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image, // image name
    };

    if (this.id) {
      // If an id is provided, update the product in the database
      const productId = new mongoDb.ObjectId(this.id);
      if (!this.image) {
        // If no image is provided, remove the image property from the product data
        delete productData.image;
      }

      // Updating the product in the database
      await db
        .getDb()
        .collection('products')
        .updateOne({ _id: productId }, { $set: productData });
    } else {
      // If no id is provided, insert the product data into the database as a new product
      await db.getDb().collection('products').insertOne(productData);
    }
  }

  // Method to replace the image of the product
  replaceImage(newImage) {
    // Updating the image property of the product
    this.image = newImage;

    // Updating the image data of the product
    this.updateImageData();
  }

  remove() {
    const productId = new mongoDb.ObjectId(this.id);
    return db.getDb().collection('products').deleteOne({ _id: productId });
  }
}

// Exporting the Product class
module.exports = Product;
