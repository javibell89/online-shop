// Import the Product model
const Product = require('../models/product.model');

// Define an asynchronous function to add an item to the cart
async function addCartItem(req, res, next) {
  let product;

  // Try to find the product with the given ID in the database
  try {
    product = await Product.findById(req.body.productId);
  } catch (error) {
    // If an error occurs (e.g., the product doesn't exist), pass the error to the next middleware
    next(error);
    return;
  }

  // Get the cart from the response's local variables
  const cart = res.locals.cart;

  // Add the product to the cart
  cart.addItem(product);

  // Update the session with the new cart
  req.session.cart = cart;

  // Send a response with a status of 201 (Created), a success message, and the new total quantity of items in the cart
  res.status(201).json({
    message: 'Item added to cart',
    newTotalItems: cart.totalQuantity,
  });
}

// Export the addCartItem function
module.exports = {
  addCartItem,
};
