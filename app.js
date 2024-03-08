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
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');

// Initializing express app
const app = express();

// Setting up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Setting up static files directory
app.use(express.static('public'));
app.use('/products/assets', express.static('product-data'));

// Parsing incoming requests
app.use(express.urlencoded({ extended: false }));

// Creating session configuration
const sessionConfig = createSessionConfig();

// Applying middlewares
app.use(expressSession(sessionConfig)); // session middleware
app.use(csrf()); // CSRF protection middleware
app.use(addCsrfTokenMiddleware); // middleware to add CSRF token to views
app.use(checkAuthStatusMiddleware); // middleware to check authentication status

// Setting up routes
app.use(baseRoutes); // base routes
app.use(authRoutes); // authentication routes
app.use(productsRoutes); // product routes
app.use('/admin/', adminRoutes); // admin routes

// Error handling middleware
app.use(errorHandleMiddleware);

// Connecting to the database and starting the server
db.connectToDatabase()
  .then(function () {
    app.listen(3000); // start the server on port 3000
  })
  .catch(function (error) {
    console.log('Error connecting to database');
    console.log(error);
  });
