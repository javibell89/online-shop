// Define a middleware function to protect routes
function protectRoutes(req, res, next) {
  // If the user is not authenticated (as indicated by res.locals.isAuth), redirect them to the /401 page
  if (!res.locals.isAuth) {
    return res.redirect('/401');
  }

  // If the user is trying to access an admin route (as indicated by req.path.startsWith('/admin')) but they are not an admin (as indicated by !res.locals.isAdmin), redirect them to the /403 page
  if (req.path.startsWith('/admin') && !res.locals.isAdmin) {
    return res.redirect('/403');
  }

  // If the user is authenticated and (if necessary) an admin, call the next middleware function
  next();
}

// Export the protectRoutes function
module.exports = protectRoutes;
