// Function to create a user session
function createUserSession(req, user, action) {
  // Storing the user's ID in the session
  req.session.uid = user._id.toString();
  // Storing the user's admin status in the session
  req.session.isAdmin = user.isAdmin;
  // Saving the session and calling the provided action when done
  req.session.save(action);
}

// Function to destroy a user's authentication session
function destroyUserAuthSession(req) {
  // Setting the user's ID in the session to null
  req.session.uid = null;
}

// Exporting the createUserSession and destroyUserAuthSession functions
module.exports = {
  createUserSession: createUserSession,
  destroyUserAuthSession: destroyUserAuthSession,
};
