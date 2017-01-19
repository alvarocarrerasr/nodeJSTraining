const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3210; // for Heroku purposes.

/* So as to make the application work in Heroku, we need to include
start: node server.js.

Moreover, we'll start the app using the command npm start.
*/

const maintenanceMode = false;
var app = express();
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine","hbs");


app.use((request,response,next)=>{
  /*Simple logger, middleware*/
  const file="logFile.txt"
  var now = new Date().toString();
  var line=`${now}: ${request.method} ${request.url}`;
  console.log(line);
  fs.appendFile(file,`${line}\n`,(error)=>{
    if(error){
      console.log("Error while writing into log");
    }
  });
  if(maintenanceMode){
    response.render("maintenance.hbs");
  }else{
    next();//to move to the next piece of middleware
  }
});

app.get("/whatIReallyLike", (request,response)=>{
  //response.send("<h1><b>Hello World!</b></h1>");
  response.send({
    name:"Álvaro"
  });
});

hbs.registerHelper("getDate",()=>{
  return new Date();
});


app.get("/",(request,response)=>{
  var date = new Date();
  const author="Álvaro";
  const currentYear=date.getFullYear();
  response.render("index.hbs",{
    date,
    author,
    currentYear
  });
})

app.get("/3II",(request,response)=>{
  var obj={
    universidad:"Universidad de Valladolid",
    grado:"Grado en Ingeniería Informática",
    curso:3,
    cuatrimestre:1,
    asignaturas:[
      "Seguridad de Redes y Sistemas",
      "Análisis y Diseño de Bases de Datos",
      "Modelado de Sistemas Software",
      "Análisis y Diseño de Algoritmos",
      "Ingeniería del Conocimiento"
    ]
  };
  response.send(obj);
})
app.use(express.static("./public_content")); //to use a directory for hosting static-only files
app.listen(port,()=>{
  console.log("Server is listening on port",port);
});
