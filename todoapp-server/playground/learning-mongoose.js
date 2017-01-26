const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

var TodoTask = mongoose.model("TodoApp Task",
{
  title:{
    type : String
  },
  description:{
    type : String
  },
  completed:{
    type : Boolean
  },
  completedAt:{
    type : Number
  }
});

var newTodo = new TodoTask ({
  title: "Task title example"
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

newTodo.save().then(
  (result)=>{
    console.log(result)
  },
  (error)=>{
    console.log("Error",error);
  }
);

mongoose.disconnect();
