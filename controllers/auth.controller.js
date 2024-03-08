// Importing the User model
const User = require('../models/user.model');
// Importing the authentication utility
const authUtil = require('../util/authentication');
// Importing the validation utility
const validation = require('../util/validation');
// Importing the session flash utility
const sessionFlash = require('../util/session-flash');

// Function to render the signup page
function getSignup(req, res) {
  // Getting the session data
  let sessionData = sessionFlash.getSessionData(req);

  // If there's no session data, initialize it with empty values
  if (!sessionData) {
    sessionData = {
      email: '',
      confirmEmail: '',
      password: '',
      fullname: '',
      street: '',
      postal: '',
      city: '',
    };
  }

  // Rendering the signup page with the session data
  res.render('customer/auth/signup', { inputData: sessionData });
}

// Function to handle signup
async function signup(req, res, next) {
  // Getting the entered data from the request body
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body['confirm-email'],
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city,
  };

  // If the entered data is not valid or the email is not confirmed
  if (
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    ) ||
    !validation.emailIsConfirm(req.body.email, req.body['confirm-email'])
  ) {
    // Flash an error message to the session and redirect to the signup page
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage:
          'Please check your input. Password must be at least 6 characters long. Postal code must be 5 characters long',
        ...enteredData,
      },
      function () {
        res.redirect('/signup');
      }
    );
    return;
  }

  // Creating a new user with the entered data
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  try {
    // Checking if the user already exists
    const existsAlready = await user.existsAlready();

    // If the user already exists
    if (existsAlready) {
      // Flash an error message to the session and redirect to the signup page
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage: 'User exists already! Try logging in instead!',
          ...enteredData,
        },
        function () {
          res.redirect('/signup');
        }
      );

      return;
    }

    // Signing up the user
    await user.signup();
  } catch (error) {
    // Passing the error to the next middleware in the stack
    return next(error);
  }

  // Redirecting to the login page
  res.redirect('/login');
}

// Function to render the login page
function getLogin(req, res) {
  // Getting the session data
  let sessionData = sessionFlash.getSessionData(req);

  // If there's no session data, initialize it with empty values
  if (!sessionData) {
    sessionData = {
      email: '',
      password: '',
    };
  }

  // Rendering the login page with the session data
  res.render('customer/auth/login', { inputData: sessionData });
}

// Function to handle login
async function login(req, res) {
  // Creating a new user instance with the entered email and password
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    // Checking if a user with the same email exists
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    // Passing the error to the next middleware in the stack
    return next(error);
  }

  // Defining the session error data
  const sessionErrorData = {
    errorMessage:
      'Invalid credentials. Please double check your email and password.',
    email: user.email,
    password: user.password,
  };

  // If the user does not exist
  if (!existingUser) {
    // Flash the error data to the session and redirect to the login page
    sessionFlash.flashDataToSession(req, sessionErrorData, function () {
      res.redirect('/login');
    });

    return;
  }

  // Checking if the entered password is correct
  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  // If the password is not correct
  if (!passwordIsCorrect) {
    // Flash the error data to the session and redirect to the login page
    sessionFlash.flashDataToSession(req, sessionErrorData, function () {
      res.redirect('/login');
    });
    return;
  }

  // Creating a user session and redirecting to the home page
  authUtil.createUserSession(req, existingUser, function () {
    res.redirect('/');
  });
}

// Function to handle logout
function logout(req, res) {
  // Destroying the user session
  authUtil.destroyUserAuthSession(req);
  // Redirecting to the login page
  res.redirect('/login');
}

// Exporting the controller functions
module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
