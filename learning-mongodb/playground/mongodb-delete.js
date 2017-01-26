// const mongoclient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

var obj = new ObjectID();

console.log(obj);

var user = {name:"Álvaro",age:20};
var {name} = user;

const dbName="TodoApp";
const dbURL="mongodb://localhost:27017/"


MongoClient.connect(`${dbURL}${dbName}`,(err, db)=>{
  if(err){
    console.log("Error while connecting to DB Server");
    return;
  }
    console.log("Connected successfully to DB Server");
    //deleteMany
    // db.collection("todos").deleteMany({Universidad:"Universidad de La Coruña"}).then(
    //   (result)=>{
    //     console.log(result);
    //   },
    //   (error)=>{
    //     console.log(error);
    //   }
    // )
    //deleteOne
    // db.collection("todos").deleteOne({Universidad:"Universidad de Burgos"}).then(
    //   (result)=>{
    //     console.log(result.result);
    //   },
    //   (error)=>{
    //     console.log(error);
    //   }
    // );
    //findOneAndDeleteOne
    // db.collection("todos").findOneAndDelete({Universidad:"Universidad de Leon"}).then(
    //   (result)=>{
    //     console.log(result);
    //   },
    //   (error)=>{
    //     console.log(error)
    //   }
    // );

    db.close();
});
