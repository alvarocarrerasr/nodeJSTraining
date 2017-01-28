/*
File to configure mongoose in all program files
*/
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
// const username = "";
// const passw = "";
//mongoose.connect(`mongodb://${username}:${passw}@ds055925.mlab.com:55925/tasksmongodbnode`);
if(process.env.NODE_ENV === "test"){
  mongoose.connect(`mongodb://localhost:27017/tasksmongodbnodeTest`);
}else{
  mongoose.connect(`mongodb://localhost:27017/tasksmongodbnode`);
}


module.exports = {
  mongoose
};
