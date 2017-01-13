const request = require("request");

req_data={
  url:"http://maps.googleapis.com/maps/api/geocode/json?address=madrid",
  json:true
};


request(req_data, (error,response,body)=>{
  console.log(JSON.stringify(body,undefined,2));
})
