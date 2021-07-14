let socket = io();

document.querySelector("#chat").addEventListener("submit", (event) => {
      event.preventDefault();

      const username = document.querySelector('input[name="username"]').value;
      const message = document.querySelector('input[name="message"]').value;

      if(username.length && message.length) {
        const messageData = {
          username,
          message,
        };

        document.querySelector('input[name="username"]').disabled = true;
        renderMessage(messageData);
        socket.emit('newMessage', messageData);
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

socket.on('showReceivedMessage', (message) => {
  renderMessage(message);
});

socket.on('showAllMessages', (messages) => {
  for(let message of messages) {
    renderMessage(message);
  }
});
