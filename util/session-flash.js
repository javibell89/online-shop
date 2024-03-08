// Function to get session data
function getSessionData(req) {
  // Getting the flashedData from the session
  const sessionData = req.session.flashedData;
  // Setting the flashedData in the session to null
  req.session.flashedData = null;
  // Returning the session data
  return sessionData;
}

// Function to flash data to the session
function flashDataToSession(req, data, action) {
  // Setting the flashedData in the session to the provided data
  req.session.flashedData = data;
  // Saving the session and calling the provided action when done
  req.session.save(action);
}

// Exporting the getSessionData and flashDataToSession functions
module.exports = {
  getSessionData: getSessionData,
  flashDataToSession: flashDataToSession,
};
