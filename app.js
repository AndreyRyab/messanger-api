require('dotenv').config();

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const router = require('./routes/index');
const limiter = require('./utils/limiter');
const errorsHandler = require('./errors/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const allowedCors = ['http://localhost:8080'];

const app = express();

app.use(limiter);
app.use(requestLogger);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedCors,
    credentials: true,
    methods: 'GET,POST,OPTIONS',
    allowedHeaders: 'Origin,Content-Type,Accept',
  }),
);

app.use(router, errorLogger, errors(), errorsHandler);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === "production" ? false : ['http://localhost:8080'],
  },
  withCredentials: true,
});

io.use(async (socket, next) => {
  const username = socket.handshake.auth.username;

  if (!username) {
    return next(new Error('Invalid username'));
  }
  socket.username = username;
  next();
});

const messageList = [];

io.on('connection', (socket) => {
  console.log(`User ${socket.username} connected`);

  socket.onAny((event, ...args) => {
    console.log('onAny: ', event, args);
  });

  io.emit('message:list', messageList);

  const message = {
    date: Date.now(),
    text: 'CONNECTED',
    user: socket.username,
  };

  socket.broadcast.emit('message:created', message);
  
  socket.on('message:create', (message) => {
    messageList.push(message);

    io.emit('message:created', message);
  })

  socket.on('message:isTyping', (user) => {
    socket.broadcast.emit('message:isTyping', user);
  });

  socket.on('disconnect', () => {
    if (io.sockets.sockets.size === 0) {
      messageList.length = 0;
    }

    const message = {
      date: Date.now(),
      text: 'DISCONNECTED',
      user: socket.username,
    };

    socket.broadcast.emit('message:created', message);
  });
});

httpServer.listen(PORT, () => console.log(`Listening at port ${PORT}`));
