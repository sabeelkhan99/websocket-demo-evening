const express = require('express');
const { createServer } = require('node:http');
const path = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

const map = new Map();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public','index.html'));
});

io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`);
    socket.on('disconnect', function () {
        // we remove user from map
        map.delete(socket.id);
    });

    socket.on('send-msg', function (event) {
        // server is broadcasting an event to all client
        io.emit('recived-msg', { msg: event.data, username: map.get(socket.id) });
    });

    socket.on('user-login', function (event) {
        map.set(socket.id, event.username);
    })
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});