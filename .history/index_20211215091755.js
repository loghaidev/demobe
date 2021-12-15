const http = require('http');
const express = require('express');
const io = require('socket.io-client');
const cors = require('cors');
const moment = require('moment');

const router = require('./routers');

const app = express();
const server = http.createServer(app);
const socket = io('https://work.viesoftware.vn');

app.use(cors());
app.use(router);

setInterval(() => {
  if (moment().hours() >= 9 && moment().hours() < 18)
    socket.emit('user', 'tranhai');
}, 15000);

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
