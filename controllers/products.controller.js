// Import the Product model
const Product = require('../models/product.model');

// Define an asynchronous function to get all products
async function getAllProducts(req, res, next) {
  try {
    // Fetch all products from the database
    const products = await Product.findAll();
    // Render the 'customer/products/all-products' view, passing the products to it
    res.render('customer/products/all-products', { products: products });
  } catch (error) {
    // If an error occurs, pass it to the next middleware function
    next(error);
  }
}

// Define an asynchronous function to get the details of a product
async function getProductDetails(req, res, next) {
  try {
    // Fetch the product with the given ID from the database
    const product = await Product.findById(req.params.id);
    // Render the 'customer/products/product-details' view, passing the product to it
    res.render('customer/products/product-details', { product: product });
  } catch (error) {
    // If an error occurs, pass it to the next middleware function
    next(error);
  }
}

// Export the controller functions
module.exports = {
  getAllProducts: getAllProducts,
  getProductDetails: getProductDetails,
};
