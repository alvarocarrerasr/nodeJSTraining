const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const PUBLICPATH = path.join(__dirname,"../public");
const PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketio(server);

app.use(express.static(PUBLICPATH));



io.on("connection",(socket)=>{
  const address = socket.handshake.address;
  console.log("New user connected!","IP",address);
  socket.on("disconnect",()=>{
    console.log("User disconnected","IP",address);
  });
  socket.broadcast.emit("newPeer",{
    text:"client",
    peer: address,
    date: new Date()
  });
  socket.emit("welcomeMessage",{
    text:`Hello, Welcome to our group!, ${address}`,
    peer: address,
    date: new Date()
  });

  socket.on("sendPosition",(message,callback)=>{
    console.log("New position",message);
    callback();
    io.emit("newPosition",{
      text:message.position,
      peer:address,
      date: new Date()
    });
  });

  socket.on("sendMessage",(message, callback)=>{
    console.log("New message",message);
    callback();
    io.emit("newMessage",{
      text:message.text,
      peer: address,
      date: new Date()
    });


  });



});
server.listen(PORT,()=>{
  console.log("Server is currently listening on port",PORT);
});
