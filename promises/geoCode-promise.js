/* This is another implementation of geocode code of the weather app, this time
instead of using callbacks, I gonna use a Promise*/

const request=require("request");

var geoCodeAddress = (address)=>{
  req_data={
    url:"https://maps.googleapis.com/maps/api/geocode/json?address="+encodeURIComponent(address),
    json:true
  };
  return new Promise((resolve,reject)=>{
    request(req_data, (error,response,body)=>{
      status=body.status;
      if(error){
        reject("No fue posible conectarse con los servidores de Google\n");
      }
      else if(status === "ZERO_RESULTS"){
        reject("No hubo resultados");
      }
      else if(status === "OK"){
        var coord=body.results[0].geometry.location;
        var result={
          longitud:coord.lng,
          latitud:coord.lat,
          place: body.results[0].formatted_address
        };
        resolve(result);
      }
    });
  });
};

geoCodeAddress("28011 Madrid").then(
  (ok)=>{
    console.log("Ok:",JSON.stringify(ok,undefined,2));
  },
  (fail)=>{
    console.log("It failed: ",fail);
  }
);
