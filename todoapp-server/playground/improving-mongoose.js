const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

var TodoTask = mongoose.model("TodoApp Task",
{
  title:{
    type : String,
    required: true
  },
  description:{
    type : String,
    required: true
  },
  completed:{
    type : Boolean,
    default: false
  },
  completedAt:{
    type : Number
  }
});

var anotherTodo = new TodoTask({
  title:"This is another Todo Example",
  description:"Hey there!",
  completed:true,
  completedAt:(new Date()).getTime()
});

anotherTodo.save().then(
  (result)=>{
    console.log(result);
  },
  (error)=>{
    console.log(error);
  }
);


mongoose.disconnect();
