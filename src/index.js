// src/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import Car from "./models/Car.js";
import userRoutes from "./routes/userRouter.js";
import profitRoutes from "./routes/profitRoutes..js";
import carRoutes from "./routes/carRoutes.js"; // новый роутер для машин

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Успешное подключение к MongoDB"))
  .catch((err) => console.error("❌ Ошибка подключения к MongoDB:", err));

// --- Роуты ---
app.use("/api/users", userRoutes);
app.use("/api/profit", profitRoutes);
app.use("/api/cars", carRoutes); // подключаем роутер машин

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`));
