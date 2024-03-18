// Import the Product model
const Product = require('../models/product.model');

// Define an asynchronous function to render the cart view
async function getCart(req, res) {
  // Render the 'customer/cart/cart' view
  res.render('customer/cart/cart');
}

// Define an asynchronous function to add an item to the cart
async function addCartItem(req, res, next) {
  let product;
  try {
    // Fetch the product with the given ID from the database
    product = await Product.findById(req.body.productId);
  } catch (error) {
    // If an error occurs, pass it to the next middleware function
    next(error);
    return;
  }

  // Get the cart from the response's local variables
  const { cart } = res.locals;

  // Add the product to the cart
  cart.addItem(product);
  // Update the cart in the session
  req.session.cart = cart;

  // Send a JSON response indicating that the cart was updated
  res.status(201).json({
    message: 'Cart updated!',
    newTotalItems: cart.totalQuantity,
  });
}

// Define a function to update an item in the cart
function updateCartItem(req, res) {
  // Get the cart from the response's local variables
  const { cart } = res.locals;

  // Update the quantity of the product in the cart
  const updatedItemData = cart.updateItem(
    req.body.productId,
    +req.body.quantity,
  );

  // Update the cart in the session
  req.session.cart = cart;

  // Send a JSON response indicating that the item was updated
  res.json({
    message: 'Item updated!',
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
    },
  });
}

// Export the controller functions
module.exports = {
  addCartItem,
  getCart,
  updateCartItem,
};
