// const {SHA1} = require("crypto-js");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
// var message = "My name is Álvaro";
//
// console.log(message);
// console.log("Hasheado:",SHA1(message).toString());


/*

------------------------------------------------
Playground for JWT (JSON Web Token)

*/


// var testData = {
//   name: "Álvaro",
//   age: 20
// };
//
// const salt = "SALT1234";
//
// var token = jwt.sign(testData,salt);
// console.log("Encoded",token);
//
// var decoded = jwt.verify(token,salt);
// console.log("Decoded",decoded);


const password = "pass123";
console.log("Clear password", password)
// We should hash the password with a salt
/* The first argument of bcrypt.getSalt is
the number of rounds. It is most common to set a bigger number.
 However, then bigger is the number of rounds, the bigger will be the amount
 of time elapsed to calculate it, so I gonna use only 10*/

bcrypt.genSalt(10,(err,salt)=>{
  bcrypt.hash(password,salt,(err,hash)=>{
    console.log("Hashed password",hash);
  });
});

const hashedPassword = "$2a$10$TFxEGzUKGWB0mzw0ykJSNOaEq4CFiuJONhLqGYVpZvzc0sAVeAtAW";

bcrypt.compare(password,hashedPassword,(error,result)=>{
  console.log("¿Are hashedPassword and clear password the same?",result);
});
