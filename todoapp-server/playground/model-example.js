const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

/* Challenge:
Create a model for a user which containts, at least, the next fields:
  - email: it is mandatory. Trim it. Minimum length is 1.
  - password: mandatory. Minimum length 8, max 30. Default value, timestamp.
  - username: same features as email, but it is not mandatory.
  - activated: boolean, default value false
*/
var User = mongoose.model("User",{
  email:{
    required : true,
    type: String,
    trim:true,
    lowercase:true
  },
  password:{
    type:String,
    default: (new Date()).getTime(),
    minlength: 8,
    maxlength: 30
  },
  username:{
    type:String,
    trim:true,
    lowercase:true
  },
  activated:{
    type:Boolean,
    default:false
  }
});

var newUser = new User(
  {
  email:"test@example.com",
  username:"hellow"
  }
);
newUser.save().then(
  (result)=>{
    console.log(result);
  },
  (error)=>{
    console.log(error);
  }
);

mongoose.disconnect();
