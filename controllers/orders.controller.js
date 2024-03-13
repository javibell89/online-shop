// Import the Order and User models
const Order = require('../models/order.model');
const User = require('../models/user.model');

// Define an asynchronous function to get all orders for a user
async function getOrders(req, res, next) {
  try {
    // Fetch all orders for the user with the given ID from the database
    const orders = await Order.findAllForUser(res.locals.uid);
    // Render the 'customer/orders/all-orders' view, passing the orders to it
    res.render('customer/orders/all-orders', {
      orders: orders,
    });
  } catch (error) {
    // If an error occurs, pass it to the next middleware function
    next(error);
  }
}

// Define an asynchronous function to add an order
async function addOrder(req, res, next) {
  let userDocument;
  try {
    // Fetch the user with the given ID from the database
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    // If an error occurs, pass it to the next middleware function
    return next(error);
  }

  // Create a new Order instance with the cart and the user document
  const order = new Order(cart, userDocument);

  try {
    // Save the new order to the database
    await order.save();
  } catch (error) {
    // If an error occurs, pass it to the next middleware function
    next(error);
    return;
  }

  // Clear the cart in the session
  req.session.cart = null;

  // Redirect to the '/orders' route
  res.redirect('/orders');
}

// Export the controller functions
module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
};
