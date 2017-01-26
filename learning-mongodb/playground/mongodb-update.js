// const mongoclient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

const dbName="TodoApp";
const dbURL="mongodb://localhost:27017/"

const idToUpdate = ObjectID("588731d2c41e13104fc79df1");

MongoClient.connect(`${dbURL}${dbName}`,(err, db)=>{
  if(err){
    console.log("Error while connecting to DB Server");
    return;
  }
    console.log("Connected successfully to DB Server");

    /*Reto 1:
    Cambia la Universidad del documento,
    añade un campo con el número de alumnos
    */
    // db.collection("todos").findOneAndUpdate(
    //   {_id: idToUpdate },
    //   {
    //     $set:{
    //       Universidad:"Universidad de Valladolid",
    //       numeroDeAlumnos:25000
    //       }
    //     }
    // ).then(
    //   (result)=>{
    //     console.log(result);
    //   },
    //   (error)=>{
    //     console.log(error);
    //   }
    // );

  /*Reto 2:
  Incrementa en una unidad el número de alumnos del documento
  */
  db.collection("todos").findOneAndUpdate(
    {_id:idToUpdate},
    {
      $inc:{
        numeroDeAlumnos:1
      }
    }
  ).then(
    (result)=>{
      console.log(result);
    },
    (error)=>{
      console.log(error);
    }
  )



    db.close();
});
