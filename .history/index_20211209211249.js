const http = require('http');
const express = require('express');
const io = require('socket.io-client');
const cors = require('cors');

const router = require('./routers');

const app = express();
const server = http.createServer(app);
const socket = socketio('https://work.viesoftware.vn');

app.use(cors());
app.use(router);

setInterval(() => {
  socket.emit('user', 'tranhai');
}, 5000);

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
