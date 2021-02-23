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