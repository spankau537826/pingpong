var express = require("express");
var socketIO = require("socket.io");
var http = require('http');
var path = require('path');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

const INDEX = '/index.html';
const PORT = process.env.PORT || 3000;

app.set('port', PORT);
app.use('/', express.static(__dirname));

// Routing
app.get('/', function(request, response) {
  response.sendFile(INDEX, { root: __dirname });
});

server.listen(PORT, function() {
  console.log('Starting server on port ${ PORT }');
});

	
var players = {};

io.on('connection', (socket) => {
console.log('Client connected');
socket.on('disconnect', () => console.log('Client disconnected'));
});