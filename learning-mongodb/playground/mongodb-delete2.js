// const mongoclient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

const dbName="TodoApp";
const dbURL="mongodb://localhost:27017/"


MongoClient.connect(`${dbURL}${dbName}`,(err, db)=>{
  if(err){
    console.log("Error while connecting to DB Server");
    return;
  }
    console.log("Connected successfully to DB Server");
    /*
  Remove the document whose ID is 58873240f660ca108c46ce2a
    */
    db.collection("todos").deleteOne({_id:new ObjectID("58873240f660ca108c46ce2a")}).then(
      (result)=>{
        console.log(result);
      },
      (error)=>{
        console.log(error);
      }
    );



    db.close();
});
