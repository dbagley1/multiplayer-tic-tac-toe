'use strict';

// Get Directory
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Express Setup
import express from 'express';
const app = express();
import { createServer } from 'http';
const server = createServer(app);
// Socket.io Setup
import { Server } from "socket.io";
const io = new Server(server);

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


// Static Directory
app.use(express.static(__dirname + '/public'));


// WebSocket
io.on('connection', TicTacToeSocket);

function TicTacToeSocket(socket) {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('new move', function (data) {
    console.log('new move: ' + JSON.stringify(data));
    io.emit('new move', data);
  });
}


// Server
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

