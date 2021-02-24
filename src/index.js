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
  socket.broadcast.emit('message', 'A new user has joined!');

  // 3. Have server listen for 'sendMessage'
  //    - Send message to all connected clients
  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left!');
  })
});

// Goal III: Allow clients to send messages
// 1. Create a form with an input and btn
// 2. Setup event listener for form submissions
//    - Emit 'sendMessage' with input string as message data
// 3. Have server listen for 'sendMessage'
//    - Send message to all connected clients

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});