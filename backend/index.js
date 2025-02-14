const express = require('express');
const { configdb } = require('./configuration/database');
const { userRouter } = require('./routes/User');
const { friendshipRouter } = require('./routes/Friendship');
const { messageRouter } = require('./routes/Message');
const { listFiles } = require('./configuration/google_drive');
const cors = require('cors');
require('dotenv').config()
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());


configdb();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.use('/user', userRouter);
app.use('/friendship', friendshipRouter);
app.use('/message', messageRouter);


// Tạo server HTTP từ Express app
const server = http.createServer(app);

// Tạo instance của Socket.IO và liên kết với server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // URL của ReactJS frontend
    methods: ['GET', 'POST'],
  },
});

let mappingUserIdToSocketId = {};

// Lắng nghe sự kiện kết nối từ client
io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('userIdFromClient', (userId) => {
    mappingUserIdToSocketId[userId] = socket.id;
  })

  socket.on('messageFromClient', (message) => {
      const socketIdOfOtherClient = mappingUserIdToSocketId[message.receiver_id];  
      io.to(socketIdOfOtherClient).emit('messageFromServer',message);
  })
  // Lắng nghe sự kiện ngắt kết nối
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Server lắng nghe cổng (chạy server)
server.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});