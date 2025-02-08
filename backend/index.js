const express = require('express');
const { configdb } = require('./configuration/database');
const { userRouter } = require('./routes/User');
const { friendshipRouter } = require('./routes/Friendship');
const { messageRouter } = require('./routes/Message');
const { listFiles } = require('./configuration/google_drive');
const cors = require('cors');
require('dotenv').config()


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


app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});

