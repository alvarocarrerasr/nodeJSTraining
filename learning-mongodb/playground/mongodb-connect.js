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

    // db.collection("todos").insertOne({
    //   nombre: "Álvaro",
    //   apellido: "Carreras",
    //   Universidad: "Universidad de Valladolid"
    // },(err,result)=>{
    //   if(err){
    //     console.log("I couldn't add that Document!");
    //     return;
    //   }
    //   console.log(result.ops);
    // })

    // db.collection("Users").insertOne({
    //   username:"alvarocr",
    //   name: "Álvaro Carreras",
    //   age: 20,
    //   location:"Valladolid, ES"
    // },(err,result)=>{
    //   if(err){
    //     console.log("I couldn't insert a document into db");
    //     return;
    //   }
    //   console.log(result.ops[0]._id.getTimestamp());
    // })
    db.close();
});
