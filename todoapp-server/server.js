const {mongoose} = require("./db/mongoose-setup.js");
const {TodoTask} = require("./modules/Todo.js");
const {User} = require("./modules/Todo.js");

const express = require("express");
const bodyparser = require("body-parser");

const PORT = 3000 || globals.env.PORT;
var app = express();

app.use(bodyparser.json());

app.post("/todos",(req,resp)=>{
  console.log(req.method, req.originalUrl,req.get('Content-Type'));
  var newTodo = new TodoTask({
    title:req.body.title
  });
  newTodo.save().then(
    (req)=>{
      resp.send(req);
    },
    (error)=>{
      resp.status(400).send(error);
    }
  )
});


app.get("/todos",(req,resp)=>{
  console.log(req.method, req.originalUrl,req.get('Content-Type'));
  var obj = TodoTask.find({}).then(
    (result)=>{
      resp.send(result);
    }
  );
});



app.listen(PORT,()=>{
  console.log("App listening on port",PORT);
});

module.exports={
  app
};

/*
IF I DO disconnect MONGOOSE, APP WON'T WORK
mongoose.disconnect();
*/
