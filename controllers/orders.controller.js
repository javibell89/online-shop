// Import required modules
const Order = require('../models/order.model');
const User = require('../models/user.model');
const stripe = require('stripe')(
  'sk_test_51OuCmhCOeCfqYsiP2zoIAnN9ziOixAw9nwMC4oaFBuEzqvqAI1A1RNR30fepdpcZNZGwXNYQzRW6TX10nsTNiHJq00VEAiMr2E',
);

// Function to get all orders for a user
async function getOrders(req, res, next) {
  try {
    // Find all orders for the user
    const orders = await Order.findAllForUser(res.locals.uid);
    // Render the orders page
    res.render('customer/orders/all-orders', {
      orders,
    });
  } catch (error) {
    // Pass any errors to the next middleware
    next(error);
  }
}

// Function to add an order
async function addOrder(req, res, next) {
  // Get the cart from the request
  const { cart } = res.locals;

  let userDocument;
  try {
    // Find the user document
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    // Pass any errors to the next middleware
    return next(error);
  }

  // Create a new order with the cart and user document
  const order = new Order(cart, userDocument);

  try {
    // Save the order
    await order.save();
  } catch (error) {
    // Pass any errors to the next middleware
    next(error);
    return;
  }

  // Clear the cart in the session
  req.session.cart = null;

  // Create a new Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: cart.items.map(function (item) {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.title,
          },
          unit_amount: +item.product.price.toFixed(2) * 100,
        },
        quantity: item.quantity,
      };
    }),
    mode: 'payment',
    success_url: `http://localhost:3000/orders/success`,
    cancel_url: `http://localhost:3000/orders/failure`,
  });

  // Redirect to the Stripe checkout session
  res.redirect(303, session.url);
}

// Function to handle successful orders
function getSuccess(req, res) {
  // Render the success page
  res.render('customer/orders/success');
}

// Function to handle failed orders
function getFailure(req, res) {
  // Render the failure page
  res.render('customer/orders/failure');
}

// Export the functions
module.exports = {
  addOrder,
  getOrders,
  getSuccess,
  getFailure,
};
