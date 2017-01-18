const yargs = require("yargs");
const geocode = require("./geocode/geocode.js");
const forecast = require("./forecast/forecast.js");

const args=yargs.options({
  a:{
    demand:true,
    alias:"address",
    describe:"Dirección a buscar",
    string:true
  }
}).help().argv;

geocode.geoCodeAddress(args.address, function (error, geoData){
  if(error){
    console.log(error);
  }
  else{
    console.log("Previsión de tiempo para "+geoData.place);
    console.log("Longitud "+geoData.longitud);
    console.log("Latitud "+geoData.latitud);
    forecast.requestForecast(geoData.latitud,geoData.longitud, (err,forecastData)=>{
      if(err){
        console.log("Error en la obtención de los datos de temperatura");
      }
      else{
        console.log("Ahora en "+ geoData.place);
        console.log("Tiene una previsión de tiempo de "+forecastData.summary);
        console.log("Temperatura "+forecastData.temperature+" ºC que aparentan ser "+forecastData.apparentTemperature+" ºC");
      }
    });
  }
});
