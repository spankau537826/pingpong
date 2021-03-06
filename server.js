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

// Establish database connection
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
  sendQuery(`INSERT INTO session (id) VALUES ('${sessionid}');`);

  setInterval(function() {
    io.emit('sessionid', sessionid);
  }, 1000 / 60);
  socket.on('getting session',function(data) {
    var foreignsessionid = data;
    sendQuery(`UPDATE session SET player2 = '${socket.id}' WHERE id = '${foreignsessionid}';`);
    socket.emit('ready for game');
  });
  socket.on('new player', function(data) {
    console.log('new player');
    console.log(socket.id);
    players[socket.id] = {
      x: data.x,
      y: data.y,
      name: data.name,
      session: sessionid
    };
    sendQuery(`INSERT INTO player (id,session,name,x,y) VALUES ('${socket.id}','${sessionid}','test',${players[socket.id].x},${players[socket.id].y});`);
    sendQuery(`UPDATE session SET player1 = '${socket.id}' WHERE id = '${sessionid}';`);
  });
  socket.on('disconnect', function() {
    console.log('Client disconnected');
    socket.emit('session closed');
    sendQuery(`DELETE FROM player WHERE id='${socket.id}';`);
    sendQuery(`DELETE FROM session WHERE id='${sessionid}';`);
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
      io.sockets.emit('servererror',err);
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
}