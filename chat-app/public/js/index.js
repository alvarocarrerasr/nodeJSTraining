var socket = io();
socket.on("connect",function (){
  console.log("Connected to server");
});
socket.on("disconnect",function (){
  console.log("Ups... it seems server has been disconnected");
});

socket.on("newMessage",function (message){
  addText("Nuevo mensaje: ",message);
});

socket.on("newPeer",function (message){
  addText("New peer joined the group", message);
})
socket.on("welcomeMessage", function(message){
  addText("Welcome message", message);
});

socket.on("newPosition",function(position){
  addText("New position received",position);
});
$(document).ready(function() {
  $("#sendNewMessage").click(function(e){
    e.preventDefault();
    const message = document.getElementById("message").value;
    document.getElementById("message").value = "";
    socket.emit("sendMessage",{
      text: message || "(empty message)",
    }, function(){
      addText("ACK: ",{
        text:"Message has been successfully sent",
        date: new Date(),
        peer: "me"}
      );
    });
  });

  $("#sendCurrentLocation").click(function(e){
    e.preventDefault();
    if(!navigator.geolocation){
      return alert("Geolocation not supported by your browser");
    }
    navigator.geolocation.getCurrentPosition(function(position){
      socket.emit("sendPosition",{
        position:position
      },function(){
        addText("ACK: ",{
          text:"Position has been successfully sent",
          date: new Date(),
          peer: "me"
    });
  });
});
});
});

function addText(arg1,text){
  var html = arg1+" "+"<b>"+text.peer+"</b>  Date: "+text.date+":"+"</br>"+"<i>"+text.text+"</i>";
  document.getElementById("txt").innerHTML+=("<li>"+html+"</li>");

};
