const express = require("express");
const hbs = require("hbs");

var app = express();
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine","hbs");

//app.use(express.static("./public_content")); //to use a directory for hosting static-only files

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

app.listen(3210);
