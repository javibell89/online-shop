// Importing the Product model
const Product = require('../models/product.model');

// Function to get all products
async function getProducts(req, res, next) {
  try {
    // Fetching all products from the database
    const products = await Product.findAll();
    // Rendering the 'all-products' view with the fetched products
    res.render('admin/products/all-products', { products: products });
  } catch (error) {
    // Passing the error to the next middleware in the stack
    next(error);
    return;
  }
}

// Function to render the 'new-product' view
function getNewProduct(req, res) {
  res.render('admin/products/new-product');
}

// Function to create a new product
async function createNewProduct(req, res, next) {
  // Creating a new product with the data from the request body and the uploaded image filename
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    // Saving the new product to the database
    await product.save();
  } catch (error) {
    // Passing the error to the next middleware in the stack
    next(error);
    return;
  }

  // Redirecting to the 'all-products' view
  res.redirect('/admin/products');
}

// Function to get a product for updating
async function getUpdateProduct(req, res, next) {
  try {
    // Fetching the product with the provided ID from the database
    const product = await Product.findById(req.params.id);
    // Rendering the 'update-product' view with the fetched product
    res.render('admin/products/update-product', { product: product });
  } catch (error) {
    // Passing the error to the next middleware in the stack
    next(error);
    return;
  }
}

// Function to handle updating a product
async function updateProduct(req, res, next) {
  // Creating a new Product instance with the data from the request body and the id from the request parameters
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  // If a file is included in the request (the updated image), replace the product's image with the new one
  if (req.file) {
    product.replaceImage(req.file.filename);
  }

  // Try to save the updated product
  try {
    await product.save();
  } catch (error) {
    // If an error occurs, pass it to the next middleware in the chain
    next(error);
    return;
  }

  // If the product is successfully updated, redirect the user to the admin products page
  res.redirect('/admin/products');
}

// Exporting the controller functions
module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
};
