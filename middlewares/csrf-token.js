// Function to add CSRF token to the response locals
function addCsrfToken(req, res, next) {
  // Adding the CSRF token to the response locals
  // so it can be accessed in the views
  res.locals.csrfToken = req.csrfToken();

  // Calling the next middleware in the stack
  next();
}

// Exporting the addCsrfToken function
module.exports = addCsrfToken;
