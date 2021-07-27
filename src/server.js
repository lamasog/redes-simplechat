const path = require('path');
const express = require('express');

// Criação do servidor com express e socket.io
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Caminho para as views
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Rota inicial
app.use('/', (req, res) => {
  res.render('index.html');
});

// Porta em que o servidor deve rodar
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server running on port ${port}...`));

// Array para armazenar todas as mensagens do chat
let allMessages = [];

// Eventos da conexão com o socket
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Emissão do evento para o client renderizar todas as mensagens do chat
  socket.emit('showAllMessages', allMessages);

  // Recebe nova mensagem, armazena no array e emite um novo evento para o 
  // client renderizar a nova mensagem para todos os clients
  socket.on('newMessage', data => {
    allMessages.push(data);
    socket.broadcast.emit('showReceivedMessage', data);
  })

  // Evento de desconexão padrão, apenas exibe a informação no console
  socket.on('disconnecting', () => {
     console.log(`Client disconnected: ${socket.id}`);
  })
});

