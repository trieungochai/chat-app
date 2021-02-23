const socket = io();

// server (emit) -> client (receive) - countUpdated
// client (emit) -> server (receive) - increment

// socket.on('countUpdated', (count) => {
//   console.log('The count has been updated!', count);
// });

// document.querySelector('#increment').addEventListener('click', () => {
//   console.log('Clicked');
//   socket.emit('increment');
// });

// Goal II: Send a welcome message to new users
// 2. Have client listen for "message" event and print to console
socket.on('message', (message) => {
  console.log(message);
});

// Goal III: Allow clients to send messages
// 2. Setup event listener for form submissions
//    - Emit 'sendMessage' with input string as message data
document.querySelector('#message-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const message = e.target.elements.message.value;
  socket.emit('sendMessage', message);
});