const yargs = require("yargs");
const axios = require("axios");

const args=yargs.options({
  a:{
    demand:true,
    alias:"address",
    describe:"Dirección a buscar",
    string:true
  }
}).help().argv;

const address=encodeURIComponent(args.address);
const baseGeocodeURL="https://maps.googleapis.com/maps/api/geocode/json?address=";
var geoCodeURL=baseGeocodeURL+address;

const baseForecastURL = "https://api.darksky.net/forecast/";
const forecastAPIKey = encodeURIComponent("****");
var forecastURL=baseForecastURL+forecastAPIKey+"/";
const forecastRequestProperties={
  lang:"es",
  units:"ca" /*SI units+ wind speed in KmH*/
}
var place="";


axios.get(geoCodeURL).then(
  (response)=>{
    if(response.data.status == 'ZERO_RESULTS'){
      throw new Error("Error: No se ha encontrado ningún resultado");
    }else{
      var coord = response.data.results[0].geometry.location;
      var longitud = coord.lng;
      var latitud = coord.lat;
      place = response.data.results[0].formatted_address;
      return axios.get(forecastURL+latitud+","+longitud, {
        params:forecastRequestProperties
      });
    }
  }
).then((response)=>{
  if(response.status != 200){
    console.log("Error while requesting forecast")
    throw new Error("Error while requesting forecast");
  }
  else {
    var forecastDt=response.data.currently;
    console.log("Ahora en",place);
    console.log("Tiene una previsión de tiempo de "+forecastDt.summary);
    console.log("Temperatura "+forecastDt.temperature+" ºC que aparentan ser "+forecastDt.apparentTemperature+" ºC");
  }
}).catch((error)=>{
  /*Este catch recoge todos los errores producidos anteriormente*/
    console.log("Hubo un error:",error);
});
