const db = require("./db.js");


module.exports.handleSignup = (email,password) => {
  /* Function will check if email already exists.
  save the user to db
  send welcome email
  */
  db.saveUser(email,password);
};
