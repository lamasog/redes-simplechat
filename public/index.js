let socket = io();

// Esperando o usuário preencher o formulário
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.querySelector('input[name="username"]').value;
    const message = document.querySelector('input[name="message"]').value;
    
    if(username.length && message.length) {
      const messageData = {
        username,
        message,
      };
    
      // Renderiza a mensagem e emite o evento para o servidor
      renderMessage(messageData);
      socket.emit('newMessage', messageData);
    }
  });
    
// Aguarda evento do servidor e renderiza a mensagem recebida
socket.on('showReceivedMessage', (message) => {
  renderMessage(message);
});

// Aguarda o evento do servidor para renderizar todas as mensagens
socket.on('showAllMessages', (messages) => {
  for(let message of messages) {
    renderMessage(message);
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
