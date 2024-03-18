// Middleware function to handle errors
function handleErrors(error, req, res, next) {
  // Logging the error to the console
  console.log(error);

  if (error.code === 404) {
    // Sending a 404 status code and rendering the '404' view
    return res.status(404).render('shared/404');
  }
  // Sending a 500 status code and rendering the '500' view
  return res.status(500).render('shared/500');
}

// Exporting the handleErrors function
module.exports = handleErrors;
