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

const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://jzhvuxxodzvrxu:1b404a5c1bd2698a0f24309580cbcbf313c39bb4c192cfa69f04d4f618d8e095@ec2-46-137-156-205.eu-west-1.compute.amazonaws.com:5432/daq5jiheq0aea7',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

var players = {};

// Add the WebSocket handlers
io.on('connection', function(socket) {
  console.log('Client connected');
  const sessionid = uuidv4();
  socket.on('new player', function() {
    console.log('new player');
    // players[socket.id] = {
    //   x: 300,
    //   y: 300
    // };
    client.query(`INSERT INTO session (id) VALUES ('${sessionid}');`, (err, res) => {
      console.log(sessionid);
      if (err) {
        socket.emit('servererror',err);
        if (err.code !== undefined) {
          console.log("pg error code:", err.code);
        
          // 42601 = 'syntax_error'
          if (err.code === "42601") {
            // return the position of the SQL syntax error
            console.log("SQL syntax error position:", err.position);
          }
        }
        throw err;
      }
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
      socket.emit('sessionid',sessionid);
      // client.end();
    });
  });
  socket.on('disconnect', function() {
    console.log('Client disconnected');
    client.query(`DELETE FROM session WHERE id='${sessionid}';`, (err, res) => {
      if (err) {
        socket.emit('servererror',err);
        if (err.code !== undefined) {
          console.log("pg error code:", err.code);
        
          // 42601 = 'syntax_error'
          if (err.code === "42601") {
            // return the position of the SQL syntax error
            console.log("SQL syntax error position:", err.position);
          }
        }
        throw err;
      }
    });
  })
});

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function sendQuery(query) {
  var result = false;
  client.query(query, (err, res) => {
    if (err) {
      socket.emit('servererror',err);
      if (err.code !== undefined) {
        console.log("pg error code:", err.code);
      
        // 42601 = 'syntax_error'
        if (err.code === "42601") {
          // return the position of the SQL syntax error
          console.log("SQL syntax error position:", err.position);
        }
      }
      throw err;
    } 
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    result = true;
  });
  return Boolean(result);
}

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