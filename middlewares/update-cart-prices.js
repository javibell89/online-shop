// Define an asynchronous function to update the prices in the cart
async function updateCartPrices(req, res, next) {
  // Get the cart from the response's local variables
  const cart = res.locals.cart;

  // Call the cart's updatePrices method to update the prices of the items in the cart
  await cart.updatePrices();

  // Uncomment the following line if you want to update the cart in the session with the new prices
  // req.session.cart = cart;

  // Call the next middleware function
  next();
}

// Export the updateCartPrices function
module.exports = updateCartPrices;
