// Connect to Socket
const socket = io();

// DOM Elements
const form = document.getElementById('form');
const input = document.getElementById('input');

// Emit Chat Message Events
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

// Listen for Chat Messages
socket.on('chat message', function (msg) {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
