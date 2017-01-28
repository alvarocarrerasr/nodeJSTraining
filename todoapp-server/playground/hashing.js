const {SHA1} = require("crypto-js");

var message = "My name is Álvaro";

console.log(message);
console.log("Hasheado:",SHA1(message).toString());
