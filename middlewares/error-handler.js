// Middleware function to handle errors
function handleErrors(error, req, res, next) {
  // Logging the error to the console
  console.log(error);
  // Sending a 500 status code and rendering the '500' view
  res.status(500).render('shared/500');
}

// Exporting the handleErrors function
module.exports = handleErrors;
