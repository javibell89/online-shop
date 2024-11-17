// Define a middleware function to protect routes
function protectRoutes(req, res, next) {
  // If the user is not authenticated, redirect to 401
  if (!res.locals.isAuth) {
    return res.redirect('/401');
  }

  // Check if user is trying to access admin route without admin privileges
  const isAdminRoute = req.path.startsWith('/admin');
  const hasAdminRights = res.locals.isAdmin;

  if (isAdminRoute && !hasAdminRights) {
    return res.redirect('/403');
  }

  // User is authenticated and has necessary permissions
  return next();
}

// Export the protectRoutes function
module.exports = protectRoutes;
