// const mongoclient = require("mongodb").MongoClient;
const {MongoClient} = require("mongodb");

const dbName="TodoApp";
const dbURL="mongodb://localhost:27017/"


MongoClient.connect(`${dbURL}${dbName}`,(err, db)=>{
  if(err){
    console.log("Error while connecting to DB Server");
    return;
  }
    console.log("Connected successfully to DB Server");
    const locationToFetch = "Valladolid, ES";
    /* Obtén todos los usuarios cuya Location no sea Valladolid*/
    db.collection("Users").find({
      location :
      {
        $ne : locationToFetch /* ne=not equal*/
      }
    }).toArray().then(
      (docs)=>{
        console.log("Data stored in Database");
        console.log(JSON.stringify(docs,undefined,2));
      },
      (error)=>{
        console.log("Impossible to fetch the data",error);
      }
    );

    /* Obtén el número de usuarios cuya Location no sea Valladolid*/
    db.collection("Users").find({
      location :
      {
        $ne : locationToFetch /* ne=not equal*/
      }
    }).count().then(
      (count)=>{
        console.log(`Número de usuarios que no viven en ${locationToFetch}: `,count);
      },
      (error)=>{
        console.log("Impossible to fetch the data",error);
      }
    );
    db.close();
});
