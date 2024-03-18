// Import the Product and Order models
const Product = require('../models/product.model');
const Order = require('../models/order.model');

// Define an asynchronous function to get all products
async function getProducts(req, res, next) {
  try {
    // Fetch all products from the database
    const products = await Product.findAll();
    // Render the 'all-products' view, passing the products to it
    res.render('admin/products/all-products', { products });
  } catch (error) {
    // If an error occurs, pass it to the next middleware function
    next(error);
  }
}

// Define a function to render the 'new-product' view
function getNewProduct(req, res) {
  res.render('admin/products/new-product');
}

// Define an asynchronous function to create a new product
async function createNewProduct(req, res, next) {
  // Create a new Product instance with the data from the request body and the filename of the uploaded image
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    // Save the new product to the database
    await product.save();
  } catch (error) {
    // If an error occurs, pass it to the next middleware function
    next(error);
    return;
  }

  // Redirect to the 'all-products' view
  res.redirect('/admin/products');
}

// Define an asynchronous function to get a product for updating
async function getUpdateProduct(req, res, next) {
  try {
    // Fetch the product with the given ID from the database
    const product = await Product.findById(req.params.id);
    // Render the 'update-product' view, passing the product to it
    res.render('admin/products/update-product', { product });
  } catch (error) {
    // If an error occurs, pass it to the next middleware function
    next(error);
  }
}

// Define an asynchronous function to update a product
async function updateProduct(req, res, next) {
  // Create a new Product instance with the data from the request body and the product's ID
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  // If an image file was uploaded, replace the product's image with it
  if (req.file) {
    product.replaceImage(req.file.filename);
  }

  try {
    // Save the updated product to the database
    await product.save();
  } catch (error) {
    // If an error occurs, pass it to the next middleware function
    next(error);
    return;
  }

  // Redirect to the 'all-products' view
  res.redirect('/admin/products');
}

// Define an asynchronous function to delete a product
async function deleteProduct(req, res, next) {
  let product;
  try {
    // Fetch the product with the given ID from the database
    product = await Product.findById(req.params.id);
    // Remove the product from the database
    await product.remove();
  } catch (error) {
    // If an error occurs, pass it to the next middleware function
    return next(error);
  }

  // Send a JSON response indicating that the product was deleted
  return res.json({ message: 'Deleted product!' });
}

// Define an asynchronous function to get all orders
async function getOrders(req, res, next) {
  try {
    // Fetch all orders from the database
    const orders = await Order.findAll();
    // Render the 'admin-orders' view, passing the orders to it
    res.render('admin/orders/admin-orders', {
      orders,
    });
  } catch (error) {
    // If an error occurs, pass it to the next middleware function
    next(error);
  }
}

// Define an asynchronous function to update an order
async function updateOrder(req, res, next) {
  // Get the order's ID and the new status from the request
  const orderId = req.params.id;
  const { newStatus } = req.body;

  try {
    // Fetch the order with the given ID from the database
    const order = await Order.findById(orderId);

    // Update the order's status
    order.status = newStatus;

    // Save the updated order to the database
    await order.save();

    // Send a JSON response indicating that the order was updated
    res.json({ message: 'Order updated', newStatus });
  } catch (error) {
    // If an error occurs, pass it to the next middleware function
    next(error);
  }
}

// Export the controller functions
module.exports = {
  getProducts,
  getNewProduct,
  createNewProduct,
  getUpdateProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  updateOrder,
};
