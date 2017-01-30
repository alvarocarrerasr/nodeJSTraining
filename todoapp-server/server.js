const {mongoose,settings} = require("./setup.js");
const {TodoTask} = require("./modules/Todo.js");
const {User} = require("./modules/User.js");
const {ObjectId} = require("mongodb");
const {authenticate} = require("./middleware/authenticate.js");

const express = require("express");
const bodyparser = require("body-parser");
const _ = require("lodash");

const PORT = settings.defaultPort;
const CURRENTMODE = process.env.NODE_ENV || settings.defaultMode;

var app = express();

app.use(bodyparser.json());

app.get("/users/me",authenticate,(req,res)=>{
  console.log(req.method, req.originalUrl,req.get('Content-Type'));
  res.send({"status":"Ok",
  "Operation":"Log in",
  "Description":"We identified you. Be careful!.",
  "details":req.user});
});

/*
  Method to add a single TodoTask
*/
app.post("/todos",authenticate,(req,resp)=>{
  console.log(req.method, req.originalUrl,req.get('Content-Type'));
  var newTodo = new TodoTask({
    title:req.body.title,
    description:req.body.description,
    _creator: req.user._id
  });
  newTodo.save().then(
    (req)=>{
      resp.send({"status":"Ok",
      "Operation":"Create a task",
      "Description":"We created your task",
      "note":req});
    },
    (error)=>{
      resp.status(400).send(
      {"status":"ERROR",
      "Operation":"Create a task",
      "Description":"We could not create your task"});
    }
  )
});

/*
  Method to retrieve every stored TodoTask
*/
app.get("/todos",authenticate,(req,res)=>{
  console.log(req.method, req.originalUrl,req.get('Content-Type'));
  listAllTodos(req.user._id,res);
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
app.get("/todos/:id",authenticate,(req,res)=>{
  console.log(req.method, req.originalUrl,req.get('Content-Type'));
  const query = req.params.id;
  if (query && ObjectId.isValid(query)){
    TodoTask.findOne({_id:query,_creator:req.user._id}).then(
      (result)=>{
        sendData(result,res); // I should use a fuction because of the Promise.
      },
      (error)=>{
        res.status(500).send(
        {"status":"ERROR",
        "Operation":"Get a task",
        "Description":"We could not retrieve your task"});
      }
    );
  }else{
    listAllTodos(res);
  }

});

/*
   Method to show an error message, if patch request is not correct.
*/
app.patch("/todos",(req,res)=>{
  console.log(req.method, req.originalUrl,req.get('Content-Type'));
  res.status(400).send(
  {"status":"BADREQUEST",
  "Operation":"Modify tasks",
  "Description":"Mmm... Currently, we do not support bulk updating operations"});
})

/*
   Method  to perform an update operation from a single document, using its document ID
*/
app.patch("/todos/:id",authenticate,(req,res)=>{
  console.log(req.method, req.originalUrl,req.get('Content-Type'));
  const query = req.params.id;
  const stuffToUpdate = {$set :_.pick(req.body,
    ["title","description"])};
  //We don't want user changing the task id as well as the timestamp.
  var timestamp = 0;

  if(ObjectId.isValid(query)){
    TodoTask.findOneAndUpdate({_id:query,_creator:req.user._id},stuffToUpdate)
    .then(
      (doc)=>{
        if(doc){
          timestamp = doc.completedAt;
          if(_.isBoolean(req.body.completed) && req.body.completed){
            //if task is completed, we should set as it.
            setAsCompleted(timestamp,query);
          }
          res.send(
        {"status":"Ok",
        "Operation":"Modify a task",
        "Description":"We modified the task successfully",
        doc});
        }else{
          res.status(404).send(
        {"status":"NOTFOUND",
        "Operation":"Modify a task",
        "Description":"We could not identify the task you want modify."});
        }
      },
      (error)=>{
        res.status(500).send(
        {"status":"ERROR",
        "Operation":"Modify a task",
        "Description":"We had an error while retrieving and updating the task. Do not worry!"}
      );
      }
    );
  }else{
    res.status(404).send(
      {"status":"NOTFOUND",
    "Operation":"Modify a task",
    "Description":"We could not identify the note you want modify."}
  );
  }
});


/*
  Signup method
*/
app.post("/users/newUser",(req,res)=>{
  console.log(req.method, req.originalUrl,req.get('Content-Type'));
  const requestData = req.body;
  var newUser = new User({
    email: requestData.email,
    password : requestData.password
  });
  newUser.save().then(
    ()=>{
      return newUser.generateAuthToken();
    }).then((token)=>{
    res.header('x-auth',token).send({user:newUser.toJSON(),token});
  }).catch((error)=>{res.status(400).send(
    {"status":"ALREADYREGISTERED",
  "Operation":"Sign up a user",
  "Description":"We found your email in our user database. Do not you remember me?"})});
});


/*
  Method to every stored note
*/
app.delete("/todos",authenticate,(req,res)=>{
  console.log(req.method, req.originalUrl,req.get('Content-Type'));
  res.send(removeContents({_creator:req.user._id}));
});

/*
  Method to remove a single note using its document ID.
*/
app.delete("/todos/:id",authenticate,(req,res)=>{
  console.log(req.method, req.originalUrl,req.get('Content-Type'));
  const query = req.params.id;
  if (ObjectId.isValid(query)){
    removeContents({_id:query,_creator:req.user._id},res);
  }
});

app.post("/users/login",(req,res)=>{
  console.log(req.method, req.originalUrl,req.get('Content-Type'));
  const email = req.body.email;
  const passw = req.body.password;
  User.findOne({email}).then(
    (user)=>{
      if(!user){
        return res.status(401).send(
        {"status":"NOTREGISTERED",
        "Operation":"Login a user",
        "Description":"We could not identify you!. Did you write properly your email address?"});
      }else{
        user.checkPassword(passw).then(
          (resolve)=>{
            user.generateAuthToken().then(
              (authToken)=>{
                return res.send(
                {"status":"Ok",
                "Operation":"Login a user",
                "Description":"Now you are logged in. Welcome back!",
                user,authToken});
              }
            );
          },
          (error)=>{
            res.status(404).send(
            {"status":"NOTFOUND",
            "Operation":"Login a user",
            "Description":"We could not identify you!"});
          }
        );
      }
    },
    (err)=>{
      return res.status(404).send(
      {"status":"NOTFOUND",
      "Operation":"Login a user",
      "Description":"We could not identify you!"});
    }
  );
});

/*
  Method to remove the token from database, which allows user to log-out from
  system
*/
app.delete("/users/me/token",authenticate,(req,res) => {
  console.log(req.method, req.originalUrl,req.get('Content-Type'));
  req.user.removeToken(req.token).then(
    (ok)=>{
      res.send(
      {"status":"Ok",
      "Operation":"Delete a token",
      "Description":"We removed the token."});
    },
    (error)=>{
      res.status(401).send(
      {"status":"NOTAUTH",
      "Operation":"Delete a token",
      "Description":"We could not remove the token. Please check if it already exists!"}
    );
    }
  )
});

var removeContents = (query,res)=>{
  TodoTask.remove(query).then(
    (corr)=>{
      if(!corr){
        res.status(404).send(
          {"status":"NOTFOUND",
          "Operation":"Remove tasks",
          "Description":"We could not find that note!"});
      }
      return res.send(
        {"status":"OK",
        "Operation":"Remove tasks",
        "Description":"Operation performed successfully"});
    },
    (err)=>{
      return err;
    }
  )
};

var sendData = (dataToReturn,res)=>{
  if(!dataToReturn){
    res.status(404).send(
      {"status":"NOTFOUND",
      "Operation":"Retrieve a task",
      "Description":"We could not find that note!"});
    return;
  }
  res.send(
  {"status":"OK",
  "Operation":"Retrieve a task",
  "Description":"Operation performed successfully",
  "data":dataToReturn});
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

var listAllTodos = (userID,res)=>{
  var obj = TodoTask.find({_creator:userID}).then(
    (result)=>{
      sendData(result,res);
    },
    (error)=>{
      res.statusCode(500).send(
      {"status":"ERROR",
      "Operation":"List tasks",
      "Description":"We could not complete your request!"});
    }
  );
};

app.listen(PORT,()=>{
  console.log("App listening on port",PORT, " as ", CURRENTMODE);
});

module.exports={
  app
};

/*
IF I DO disconnect MONGOOSE, APP WON'T WORK
mongoose.disconnect();
*/
