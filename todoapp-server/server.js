const {mongoose} = require("./db/mongoose-setup.js");
const {TodoTask} = require("./modules/Todo.js");
const {User} = require("./modules/Todo.js");
const {ObjectId} = require("mongodb");

const express = require("express");
const bodyparser = require("body-parser");

const PORT = process.env.PORT || 3000;
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

app.get("/todos",(req,res)=>{
  listAllTodos(res);
});

/*
  Challenge:
  If we make a GET Request to /todos/:id we have several scenarios:
  - If :id value is invalid, it should return  it should return all collection contents
  - Else if the id doesn't belongs to any item stored, it should return a 404 error.
  - Else if :id value is valid, it should return the document whose id is the one
  the user has specified within the HTTP Request.
  */
app.get("/todos/:id",(req,res)=>{
  console.log(req.method, req.originalUrl,req.get('Content-Type'));
  const query = req.params.id;
  if (query && ObjectId.isValid(query)){
    var obj = TodoTask.findById(query).then(
      (result)=>{
        sendData(result,res); // I should use a fuction because of the Promise.
      },
      (error)=>{
        res.status(500).send("Error while trying to request data");
      }
    );
  }else{
    console.log(res);
    listAllTodos(res);
  }

});



app.delete("/todos",(req,res)=>{
  console.log(req.method, req.originalUrl,req.get('Content-Type'));
  res.send(removeContents({}))
});

app.delete("/todos/:id",(req,res)=>{
  console.log(req.method, req.originalUrl,req.get('Content-Type'));
  const query = req.params.id;
  if (ObjectId.isValid(query)){
    removeContents({_id:query})
    res.send({"status":"OK","Operation":"Remove","Description":"Operation performed successfully"});
  }else{
    res.status(404).send("Element not found");
  }
});




app.listen(PORT,()=>{
  console.log("App listening on port",PORT);
});

module.exports={
  app
};

var removeContents = (query)=>{
  TodoTask.remove(query).then(
    (corr)=>{
      return corr;
    },
    (err)=>{
      return err;
    }
  )
};

var sendData = (dataToReturn,res)=>{
  if(!dataToReturn){
    res.status(404).send("TodoTask not found. Please check if ID is not misspelt!");
    return;
  }
  res.send(dataToReturn);
}

var listAllTodos = (res)=>{
  var obj = TodoTask.find({}).then(
    (result)=>{
      sendData(result,res);
    },
    (error)=>{
      res.statusCode(500).send("Error while trying to request data");
    }
  );
};

/*
IF I DO disconnect MONGOOSE, APP WON'T WORK
mongoose.disconnect();
*/
