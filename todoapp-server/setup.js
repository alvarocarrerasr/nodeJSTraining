var mongoose = require("mongoose");
const settings = require("./settings.json");
mongoose.Promise = global.Promise;

const CURRENTMODE = process.env.NODE_ENV || settings.defaultMode;

if(CURRENTMODE === "test"){
  const db = settings.database.test;
  mongoose.connect(`${db.url}${db.database}`);
}else{
  const db = settings.database.production;
  mongoose.connect(`${db.url}${db.database}`);
}




module.exports = {
  mongoose,
  settings,
};
