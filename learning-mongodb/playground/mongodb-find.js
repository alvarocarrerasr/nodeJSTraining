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
    db.collection("Users").find({age:20}).toArray().then(
      (docs)=>{
        console.log("Data stored in Database");
        console.log(JSON.stringify(docs,undefined,2));
      },
      (error)=>{
        console.log("Impossible to fetch the data",error);
      }
    );

    db.close();
});
