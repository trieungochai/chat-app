const socket = io();

// Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;

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
  const html = Mustache.render(messageTemplate, {
    message
  });
  $messages.insertAdjacentHTML('beforeend', html);
});

// Goal III: Allow clients to send messages
// 2. Setup event listener for form submissions
//    - Emit 'sendMessage' with input string as message data
$messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Disable the form once it's been submitted
  $messageFormButton.setAttribute('disabled', 'disabled');

  const message = e.target.elements.message.value;
  socket.emit('sendMessage', message, (error) => {
    // Enable (it's disabled for just a moment then it's re-enabled)
    $messageFormButton.removeAttribute('disabled');
    // clear that input after the message has been sent
    $messageFormInput.value = '';
    $messageFormInput.focus();
    
    if(error) {
      return console.log(error);
    }

    console.log('Message delivered!');
  });
});

$sendLocationButton.addEventListener('click', () => {
  if(!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser!');
  }

  // 1. Disable the button just before getting the current position
  $sendLocationButton.setAttribute('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('sendLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, () => {
      // 2. Enable the button in the acknowledgment callback
      $sendLocationButton.removeAttribute('disabled');
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

// Goal: Disable the send location button while location being sent
// 1. Disable the button just before getting the current position
// 2. Enable the button in the acknowledgment callback