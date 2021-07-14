const server = require('./server');
const io = require('socket.io')(server);

let messages = [];

io.on("connection", (socket) => {
  console.log(`Usuário conectado: ${socket.id}`);

  socket.emit('previousMessages', messages);

  socket.on('sendMessage', data => {
    console.log(data);
    messages.push(data);
    socket.broadcast.emit('receivedMessage', data);
  })
});