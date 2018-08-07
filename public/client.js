var vue = new Vue({
  el: '#app',
  data: {
    name: 'Anonymus',
    msg: ''
  }
})

// initializing socket, connection to server
var socket = io.connect("http://lukens.usermd.net");
socket.on("connect", function(data) {
  socket.emit("join", "Hello server from client");
});

// listener for 'thread' event, which updates messages
socket.on("thread", function(data) {
  var id = data.id;
  if(socket.id===data.id) id = "you";
  var el = cursorLabel(id, data.name);
  el.css('left',data.x);
  el.css('top',data.y);
});

// sends message to server, resets & prevents default form action
$( document ).on( "mousemove", function( event ) {
  var cursorXY = {
    'id': socket.id,
    'name': vue.name,
    'x': event.pageX+10,
    'y': event.pageY+10
  }
  if(socket.id && socket.id!="undefined")
  socket.emit("rtdata", cursorXY);
  return false;
});

function cursorLabel(id,name) {
  var element = $('#cursor-'+id);
  if(element.length==0) {
    var color = randomColor();
    element = $('#app').append('<div class="cursor" id="cursor-'+id+'" style="background-color:'+color+'">'+name+'</div>');
  }
  return element;
}

function randomColor(){
  var r = random(0,255);
  var g = random(0,255);
  var b = random(0,255);
  var rgb="rgb("+r+","+g+","+b+");";
  return rgb;
}

function random(from, to){
  var r= Math.floor((Math.random() * to) + from);
  return r;
}

