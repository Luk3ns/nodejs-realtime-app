var express = require("express");
var app = express(); //express init
var server = require("http").createServer(app);
var io = require("socket.io")(server);

//app.get("/", function(req, res, next) {
//  res.sendFile(__dirname + "/public/index.html");
//});

//Serving static files in Express
app.use(express.static("public")); 

io.on("connection", function(client) {
  console.log("Client connected...");

  client.on("join", function(data) {
    console.log(data);
  });

  client.on("rtdata", function(data) {
    client.emit("thread", data);
    client.broadcast.emit("thread", data);
  });
});

server.listen(3000);
