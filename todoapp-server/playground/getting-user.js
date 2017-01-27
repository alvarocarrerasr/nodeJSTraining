const {mongoose} = require("./../db/mongoose-setup");
const {User} = require("./../modules/User");

const email = "test@example.com";


User.findOne({
  email
}).then(
  (user)=>{
    if(!user){
      console.log("Email doesn't exist into the database");
      mongoose.disconnect();
      return;
    }
    console.log("Success finding user. Here you have his/her details");
    console.log(JSON.stringify(user,undefined,2));
  },
  (error)=>{
    console.log("Error",error);
  }
).catch((error)=>console.log("Error",error));

mongoose.disconnect();
