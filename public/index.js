let socket = io();

document.querySelector("#chat").addEventListener("submit", (event) => {
      event.preventDefault();

      const username = document.querySelector('input[name="username"]').value;
      const message = document.querySelector('input[name="message"]').value;

      if(username.length && message.length) {
        const messageObject = {
          username,
          message,
        };

        document.querySelector('input[name="username"]').disabled = true;
        renderMessage(messageObject);
        socket.emit('sendMessage', messageObject);
      }
});

function renderMessage(message) {
  document.querySelector('.messages').innerHTML +=
   `<div class="message">
   <strong>${message.username}</strong>: ${message.message}
   </div>`;

   document.querySelector('input[name="message"]').value = '';
   document.querySelector('input[name="message"]').focus();
}

socket.on('receivedMessage', (message) => {
  renderMessage(message);
});

socket.on('previousMessages', (messages) => {
  for(let message of messages) {
    renderMessage(message);
  }
});
