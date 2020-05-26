var express = require("express");
var socketIO = require("socket.io");
var http = require('http');
var path = require('path');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

const INDEX = '/index.html';

app.set('port', 3000);
app.use('/', express.static(__dirname));

// Routing
app.get('/', function(request, response) {
  response.sendFile(INDEX, { root: __dirname });
});

server.listen(3000, function() {
  console.log('Starting server on port 3000');
});

	
var players = {};

io.on('connection', (socket) => {
console.log('Client connected');
socket.on('disconnect', () => console.log('Client disconnected'));
});