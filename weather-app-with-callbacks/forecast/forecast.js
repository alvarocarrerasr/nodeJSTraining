const request = require("request");
const apiKey=encodeURIComponent("***");
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
