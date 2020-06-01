var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

const INDEX = '/index.html';
const PORT = process.env.PORT || 3000;

app.set('port', PORT);
app.use('/', express.static(__dirname + '/'));

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, INDEX));
});

// Starts the server.
server.listen(PORT, function() {
  console.log(`Starting server on port ${PORT}`);
});

// Add the WebSocket handlers
io.on('connection', function(socket) {
  console.log('client connected');
});

// var express = require("express");
// var socketIO = require("socket.io");
// var http = require('http');
// var path = require('path');

// var app = express();
// var server = http.Server(app);
// var io = socketIO(server);

// const INDEX = '/index.html';
// const PORT = process.env.PORT || 3000;

// app.set('port', PORT);
// app.use('/', express.static(__dirname));

// // Routing
// app.get('/', function(request, response) {
//   response.sendFile(INDEX, { root: __dirname });
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

// server.listen(PORT, function() {
//   console.log(`Listening on ${PORT}`);
// });

const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://jzhvuxxodzvrxu:1b404a5c1bd2698a0f24309580cbcbf313c39bb4c192cfa69f04d4f618d8e095@ec2-46-137-156-205.eu-west-1.compute.amazonaws.com:5432/daq5jiheq0aea7',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

// client.query('SELECT * FROM session', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });


// io.on('connection', function(socket) {
//   console.log('Client connected');
//   const random = require('random-bigint');
//   const sessionid = random(10);
//   console.log(sessionid);
//   socket.on('new player', function() {
//     players[socket.id] = {
//       x: 300,
//       y: 300
//     };
//     client.query('INSERT INTO session (id) VALUES (${sessionid});', (err, res) => {
//       if (err) throw err;
//       for (let row of res.rows) {
//         console.log(JSON.stringify(row));
//       }
//       client.end();
//     });
//   });
//   socket.on('disconnect', () => console.log('Client disconnected'));
//   });