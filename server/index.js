const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const cors = require('cors');
const newsRoutes = require('./routes/news');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });

mongoose.connect('mongodb://localhost:27017/newsfeed', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.use('/api/news', newsRoutes);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('subscribe', (category) => {
    socket.join(category);
  });
  socket.on('disconnect', () => console.log('Client disconnected'));
});

const broadcastNews = (news) => {
  io.to(news.category).emit('new-article', news);
};

server.listen(3000, () => console.log('Server started on port 3000'));
module.exports = { server, broadcastNews };