const http = require('http');
const express = require('express');
const cors = require('cors');

const router = require('./routers');

const app = express();
const server = http.createServer(app);
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(router);

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
