const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const _ = require("lodash");


const SALT = "SALTKW";
var userSchema = new mongoose.Schema({
  email:{
    required : true,
    type: String,
    trim:true,
    lowercase:true,
    minlen:1,
    unique:true,
    validate:{
      validator: (value) => {
        return validator.isEmail(value);
      },
      message:"{VALUE} is not a valid email"
    }
  },
  password:{
    required:true,
    type:String,
    minlen:4
  },
  tokens:[
    {
      access:{
        type:String,
        required:true
      },
      token:{
        type:String,
        required:true
      }
    }
  ]
});



userSchema.methods.toJSON = function (){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject,["_id","email"]);
};

/*
  Property statics stores all static methods
  (as OOP)
*/
userSchema.statics.findByToken = function (token){
  var User = this;
  var decoded;
  try{
    decoded = jwt.verify(token,SALT);
  }catch(e){
    return Promise.reject();
  }

  return User.findOne(
    {
    _id: decoded._id,
    "tokens.token":token,
    "tokens.access":"auth"
    }
  );

};

/* Instance methods for schema.
 We need a classical function (not an arrow one, ES6)
 because of the `this` keyword.
*/
userSchema.methods.generateAuthToken = function (){
  var user = this;
  var access = "auth";
  var token = jwt.sign(
    {
      _id: user._id.toHexString(),
      access
    },SALT).toString();
    user.tokens.push({access,token});

    return user.save().then(()=>{
      return token;
    });
};

var User = mongoose.model("User",userSchema);

module.exports = {
  User
};
