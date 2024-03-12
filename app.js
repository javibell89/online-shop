// Importing required modules
const path = require('path');
const express = require('express');
const csrf = require('csurf');
const expressSession = require('express-session');

// Importing custom modules
const createSessionConfig = require('./config/session');
const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandleMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const protectRoutesMiddleware = require('./middlewares/protect-routes');
const cartMiddleware = require('./middlewares/cart');
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');
const cartRoutes = require('./routes/cart.routes');

// Creating an express application
const app = express();

// Setting up the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Setting up static directories
app.use(express.static('public'));
app.use('/products/assets', express.static('product-data'));

// Parsing URL-encoded bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Creating session configuration
const sessionConfig = createSessionConfig();

// Setting up middlewares
app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(cartMiddleware);
app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

// Setting up routes
app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use('/cart', cartRoutes);
app.use(protectRoutesMiddleware);
app.use('/admin', adminRoutes);

// Setting up error handling middleware
app.use(errorHandleMiddleware);

// Connecting to the database and starting the server
db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log('Error connecting to database');
    console.log(error);
  });
