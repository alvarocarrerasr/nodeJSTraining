/*
File to configure mongoose in all program files
*/
var
 mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const username = "";
const passw = "";
mongoose.connect(`mongodb://${username}:${passw}@ds055925.mlab.com:55925/tasksmongodbnode`);

module.exports = {
  mongoose
};
