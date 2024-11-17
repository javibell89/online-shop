// Import the Cart model
const Cart = require('../models/cart.model');

// Define a middleware function to initialize the cart
function initializeCart(req, res, next) {
  let cart; // Declare a variable to hold the cart

  // If there is no cart in the session, create a new empty Cart
  if (req.session.cart) {
    const sessionCart = req.session.cart;
    // If there is a cart in the session, create a new Cart with the existing items
    cart = new Cart(
      sessionCart.items,
      sessionCart.totalQuantity,
      sessionCart.totalPrice,
    );
  } else {
    cart = new Cart();
  }

  // Attach the cart to the response object
  res.locals.cart = cart;

  // Proceed to the next middleware function
  next();
}

// Export the initializeCart function
module.exports = initializeCart;
