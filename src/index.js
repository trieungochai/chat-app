const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

// server (emit) -> client (receive) - countUpdated
// client (emit) -> server (receive) - increment

// let count = 0;

// io.on('connection', (socket) => {
//   console.log('New WebSocket connection!');

//   socket.emit('countUpdated', count);

//   socket.on('increment', () => {
//     count++;
//     // to emit the event to every connection available
//     // socket.emit('countUpdated', count);
//     // to emit the event to every single connection that's currently available
//     io.emit('countUpdated', count);
//   });
// });

// Goal II: Send a welcome message to new users
// 1. Have server emit "message" when new client connects
//    - Send "Welcome!" as the event data
// 2. Have client listen for "message" event and print to console

io.on('connection', (socket) => {
  console.log('New WebSocket connection!');

  socket.emit('message', 'Welcome!');
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});