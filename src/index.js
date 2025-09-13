const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const connectDB = require('./config/database'); // подключение к базе
const userRouter = require('./routes/userRouter'); // ✅ правильный путь к твоему файлу

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// 🔧 Middlewares
app.use(cors());
app.use(express.json());

// 🔌 Подключаемся к MongoDB
connectDB();

// 🧪 Тестовый маршрут
app.get('/', (req, res) => {
  res.send('✅ Server is running!');
});

// 👥 Подключаем роутер для пользователей
app.use('/api/users', userRouter);

// 🎧 Socket.io
io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

// 🚀 Запуск сервера
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
