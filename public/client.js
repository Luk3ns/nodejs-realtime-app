// initializing socket, connection to server
var socket = io.connect("http://lukens.usermd.net");
socket.on("connect", function(data) {
  socket.emit("join", "Hello server from client");
});

// listener for 'thread' event, which updates messages
socket.on("thread", function(data) {
  console.log(data);

  $("#thread").append("<li>"+data.date+" - "+ data.msg + "</li>");
});

// sends message to server, resets & prevents default form action
$("form").submit(function() {
  var msg = $("#message").val();
  var date = new Date();
  var message= {
    'msg':msg ,
    'date': date
  }
  socket.emit("messages", message);
  this.reset();
  return false;
});
