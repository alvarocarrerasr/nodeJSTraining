// const {SHA1} = require("crypto-js");
const jwt = require("jsonwebtoken");

// var message = "My name is Álvaro";
//
// console.log(message);
// console.log("Hasheado:",SHA1(message).toString());


/*

------------------------------------------------
Playground for JWT (JSON Web Token)

*/


var testData = {
  name: "Álvaro",
  age: 20
};

const salt = "SALT1234";

var token = jwt.sign(testData,salt);
console.log("Encoded",token);

var decoded = jwt.verify(token,salt);
console.log("Decoded",decoded);
