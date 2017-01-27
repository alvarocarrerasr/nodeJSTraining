const mongoose = require("mongoose");


const TodoTask = mongoose.model("TodoAppTask",
{
  title:{
    type : String,
    required:true
  },
  description:{
    type : String
  },
  completed:{
    type : Boolean,
    default:false
  },
  completedAt:{
    type : Number
  }
});

module.exports = {
  TodoTask
};
