const mongoose = require("mongoose");

const validator = require("validator");

var User = mongoose.model("User",{
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

module.exports = {
  User
};
