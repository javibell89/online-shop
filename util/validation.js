// Function to check if a value is empty
function isEmpty(value) {
  // Returns true if the value is null, undefined, or a string of whitespace
  return !value || value.trim() === '';
}

// Function to validate user credentials
function userCredentialsAreValid(email, password) {
  // Returns true if the email contains '@' and the password is at least 6 characters long
  return (
    email && email.includes('@') && password && password.trim().length >= 6
  );
}

// Function to validate user details
function userDetailsAreValid(email, password, name, street, postal, city) {
  // Returns true if the user credentials are valid and the name, street, postal, and city are not empty
  return (
    userCredentialsAreValid(email, password) &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
}

// Function to confirm the email
function emailIsConfirm(email, confirmEmail) {
  // Returns true if the email and confirmEmail are the same
  return email === confirmEmail;
}

// Exporting the userDetailsAreValid and emailIsConfirm functions
module.exports = {
  userDetailsAreValid: userDetailsAreValid,
  emailIsConfirm: emailIsConfirm,
};
