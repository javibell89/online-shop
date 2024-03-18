// Middleware function to check the authentication status of the user
function checkAuthStatus(req, res, next) {
  // Extracting the user ID from the session
  const { uid } = req.session;

  // If the user ID does not exist, the user is not authenticated
  // So, we call the next middleware in the stack and return
  if (!uid) {
    return next();
  }

  // If the user ID exists, the user is authenticated
  // We add the user ID to the response locals so it can be accessed in the views
  res.locals.uid = uid;
  // We also add a flag 'isAuth' to indicate that the user is authenticated
  res.locals.isAuth = true;
  // We add another flag 'isAdmin' to indicate whether the user is an admin or not
  res.locals.isAdmin = req.session.isAdmin;

  // Calling the next middleware in the stack
  return next();
}

// Exporting the checkAuthStatus function
module.exports = checkAuthStatus;
