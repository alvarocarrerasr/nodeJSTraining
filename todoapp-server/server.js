const {mongoose} = require("./db/mongoose-setup.js");
const {TodoTask} = require("./modules/Todo.js");
const {User} = require("./modules/User.js");
const {ObjectId} = require("mongodb");
const {authenticate} = require("./middleware/authenticate.js");

const express = require("express");
const bodyparser = require("body-parser");
const _ = require("lodash");

const PORT = process.env.PORT || 3000;
var app = express();

app.use(bodyparser.json());

app.get("/users/me",authenticate,(req,res)=>{
  res.send(req.user);
});

/*
  Method to add a single TodoTask
*/
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

/*
  Method to retrieve every stored TodoTask
*/
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

  Method to retrieve a single TodoTask, using its Document ID.
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

/*
   Method to show an error message, if patch request is not correct.
*/
app.patch("/todos",(req,res)=>{
  console.log(req.method, req.originalUrl,req.get('Content-Type'));
  res.status(400).send("Bad Request");
})

/*
   Method  to perform an update operation from a single document, using its document ID
*/
app.patch("/todos/:id",(req,res)=>{
  console.log(req.method, req.originalUrl,req.get('Content-Type'));
  const query = req.params.id;
  const stuffToUpdate = {$set :_.pick(req.body,
    ["title","description"])};
  //We don't want user changing the task id as well as the timestamp.
  var timestamp = 0;

  if(ObjectId.isValid(query)){
    TodoTask.findByIdAndUpdate(query,stuffToUpdate).then(
      (doc)=>{
        if(doc){
          timestamp = doc.completedAt;
          if(_.isBoolean(req.body.completed) && req.body.completed){
            //if task is completed, we should set as it.
            setAsCompleted(timestamp,query);
          }
          res.send(doc);
        }else{
          res.status(404).send("Task not found!");
        }
      },
      (error)=>{
        res.status(500).send("Task couldn't be retrieved due to a database error");
      }
    );
  }else{
    res.status(404).send("Task not found!");
  }
});


/*
  Signup method
*/
app.post("/user/newUser",(req,res)=>{
  const requestData = req.body;
  var newUser = new User({
    email: requestData.email,
    password : requestData.password
  });
  newUser.save().then(
    ()=>{
      return newUser.generateAuthToken();
    }).then((token)=>{
    res.header('x-auth',token).send(newUser.toJSON());
  }).catch((error)=>{res.status(400).send(error)});
});


/*
  Method to every stored note
*/
app.delete("/todos",(req,res)=>{
  console.log(req.method, req.originalUrl,req.get('Content-Type'));
  res.send(removeContents({}))
});

/*
  Method to remove a single note using its document ID.
*/
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
};

var setAsCompleted = (timestamp,id)=>{
  var currentTimestamp = (new Date()).getTime();
  if(!timestamp){
    TodoTask.findOneAndUpdate(id,{
      $set:
      {
      completed: true,
      completedAt: currentTimestamp
    }
  }
).then(
      (doc)=>{
        return doc;
      },
      (err)=>{
        return err;
      }
    );
  }
};

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

app.listen(PORT,()=>{
  console.log("App listening on port",PORT, " as ", (process.env.NODE_ENV || "production"));
});

module.exports={
  app
};

/*
IF I DO disconnect MONGOOSE, APP WON'T WORK
mongoose.disconnect();
*/
