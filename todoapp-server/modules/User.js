const mongoose = require("mongoose");

var User = mongoose.model("User",{
  email:{
    required : true,
    type: String,
    trim:true,
    lowercase:true
  }
});

module.exports = {
  User
};
