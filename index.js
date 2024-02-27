require('dotenv').config();
const express = require("express");
const { routes } = require("./src");
const morgan = require("morgan");
const cors = require('cors');
const io = require("socket.io")

const app = express()
const port = process.env.PORT || 4000;
const http = require('http');

app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
    methods: '*',
  })
);
app.use(express.json());

const server = http.createServer(app);

const socket = io(server, {
  transports: ['websocket', 'polling'],
  maxHttpBufferSize: 5e6, // 5 MB in bytes (1e6 bytes = 1MB)
  timeout: 10000,
  cors: {
    origin: '*',
    credentials: true,
  },
})

socket.use(function (socket, next) {
  console.log('connected');
  if (socket.handshake.query && socket.handshake.query.token) {
    // validateSocketToken(socket, next);
  }
  else {
    console.error('Authentication');
    next(new Error('Authentication error'));
  }
});

app.use('/api', routes);

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${ port }`);
});