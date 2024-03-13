// Import necessary modules
const path = require('path');
const express = require('express');
const csrf = require('csurf');
const expressSession = require('express-session');

// Import custom modules
const createSessionConfig = require('./config/session');
const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const protectRoutesMiddleware = require('./middlewares/protect-routes');
const cartMiddleware = require('./middlewares/cart');
const updateCartPricesMiddleware = require('./middlewares/update-cart-prices');
const notFoundMiddleware = require('./middlewares/not-found');
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');
const cartRoutes = require('./routes/cart.routes');
const ordersRoutes = require('./routes/orders.routes');

// Create an Express application
const app = express();

// Set the view engine to EJS and the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up static file serving
app.use(express.static('public'));
app.use('/products/assets', express.static('product-data'));

// Set up body parsing for form data and JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create a session configuration and set up session handling
const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

// Set up CSRF protection
app.use(csrf());

// Use custom middlewares
app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);
app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

// Set up routes
app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', protectRoutesMiddleware, ordersRoutes);
app.use('/admin', protectRoutesMiddleware, adminRoutes);

// Use middleware for handling 404 errors
app.use(notFoundMiddleware);

// Use middleware for handling other errors
app.use(errorHandlerMiddleware);

// Connect to the database and start the server
db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log('Failed to connect to the database!');
    console.log(error);
  });
