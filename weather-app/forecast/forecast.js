const request = require("request");
const apiKey=encodeURIComponent("f9d3268a6ce6fbfb71411195905");
const requestProperties={
  lang:"es",
  units:"ca" /*SI units+ wind speed in KmH*/
}

var requestForecast=(latitude,longitude, callback)=>{
  var reqObj={
    method:"GET",
    qs:requestProperties,
    url:"https://api.darksky.net/forecast/"+apiKey+"/"+latitude+","+longitude
  };
  request(reqObj,(err,body,request)=>{
    statusCode=body.statusCode;
    if(err | statusCode!= 200){
      callback("Error while requesting forecast");
    }
    else {
      var obj=JSON.parse(request);
      callback(undefined, obj.currently);
    }
  })
};

module.exports={
  requestForecast
};
