// Express Setup
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
// Socket.io Setup
const { Server } = require("socket.io");
const io = new Server(server);

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


// Static Directory
app.use(express.static(__dirname + '/'));


// WebSocket
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

// Server
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

