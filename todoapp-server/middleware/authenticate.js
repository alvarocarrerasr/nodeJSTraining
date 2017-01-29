var {User} = require("./../modules/User.js");

var authenticate = (req,res,next)=>{
  var token = req.header("x-auth");

  User.findByToken(token).then(
    (user)=>{
    if (!user){
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e)=>{
    res.status(401).send(
    {"status":"NOTAUTH",
    "Operation":"Authentication",
    "Description":"We could not identify you. Please check the request headers"});
  });
};

module.exports = {
  authenticate
};
