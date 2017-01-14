const request = require("request");
const yargs = require("yargs");

const args=yargs.options({
  a:{
    demand:true,
    alias:"address",
    describe:"Dirección a buscar",
    string:true
  }
}).help().argv;

var busqueda=args.a;

req_data={
  url:"https://maps.googleapis.com/maps/api/geocode/json?address="+encodeURIComponent(busqueda),
  json:true
};


request(req_data, (error,response,body)=>{
  status=body.status;
  if(error){
    console.log("No fue posible conectarse con los servidores de Google\n");
  }
  else if(status === "ZERO_RESULTS"){
    console.log("No hubo resultados");
  }
  else if(status === "OK"){
    console.log("Coordenadas de "+body.results[0].formatted_address);
    var coord=body.results[0].geometry.location;
    console.log("Longitud: "+coord.lng);
    console.log("Latitud: "+coord.lat);
  }
});
