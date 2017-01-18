const request = require("request");

var geoCodeAddress = (address, callback)=>{
  req_data={
    url:"https://maps.googleapis.com/maps/api/geocode/json?address="+encodeURIComponent(address),
    json:true
  };
  request(req_data, (error,response,body)=>{
    status=body.status;
    if(error){
      callback("No fue posible conectarse con los servidores de Google\n");
    }
    else if(status === "ZERO_RESULTS"){
      callback("No hubo resultados");
    }
    else if(status === "OK"){
      var coord=body.results[0].geometry.location;
      var result={
        longitud:coord.lng,
        latitud:coord.lat,
        place: body.results[0].formatted_address
      };
      callback(undefined,result);
    }
  });

};

module.exports={
  geoCodeAddress
};
