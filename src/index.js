import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import Car from "./models/Car.js";
import userRoutes from "./routes/userRouter.js";
import profitRoutes from "./routes/profitRoutes..js";

dotenv.config(); // Загружаем .env

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Успешное подключение к MongoDB"))
  .catch((err) => console.error("❌ Ошибка подключения к MongoDB:", err));

// --- Роуты пользователей ---
app.use("/api/users", userRoutes);


// --- Роуты прибыли ---
app.use("/api/profit", profitRoutes);



// --- Роуты машин ---

// Получить все машины
app.get("/api/cars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при получении машин" });
  }
});

// Добавить машину
app.post("/api/cars", async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ message: "Ошибка при добавлении машины" });
  }
});

// Обновить (продать) машину
app.put("/api/cars/:id", async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      {
        priceSale: req.body.priceSale,
        saleType: req.body.saleType,
        downPayment: req.body.downPayment,
        monthlyPayment: req.body.monthlyPayment,
      },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Машина не найдена" });
    }

    res.json(updatedCar);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при обновлении машины" });
  }
});

// Удалить машину
app.delete("/api/cars/:id", async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ message: "Машина не найдена" });
    }
    res.json({ message: "Машина удалена" });
  } catch (err) {
    res.status(500).json({ message: "Ошибка при удалении машины" });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`));
