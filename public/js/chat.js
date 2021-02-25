const socket = io();
// server (emit) -> client (receive) --acknowledgement --> server
// client (emit) -> server (receive) --acknowledgement --> client

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
  socket.emit('sendMessage', message, (error) => {
    if(error) {
      return console.log(error);
    }

    console.log('Message delivered!');
  });
});

document.querySelector('#send-location').addEventListener('click', () => {
  if(!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser!');
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('sendLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, () => {
      console.log('Location shared!');
    });
  });
});

// Goal: Share coordinates with other users
// 1. Have client emit "sendLocation" with an object as the data
//    - Object should contain latitude & longitude properties
// 2. Server should listen for "sendLocation"
//    - When fired, send a "message" to all connected clients "Location: long, lat"

// Goal: Setup acknowledgement
// 1. Setup the client acknowledgment function
// 2. Setup the server to send back the acknowledgment
// 3. Have the client print 'Location shared!' when acknowledged
