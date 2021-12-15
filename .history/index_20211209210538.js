const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio('https://work.viesoftware.vn');

app.use(cors());
app.use(router);

setInterval(() => {
  io.emit('user', 'tranhai');
}, 5000);

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
