const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// ✅ Регистрация пользователя
router.post("/register", async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Пользователь с таким email уже существует" });
    }

    const user = await User.create({ fullName, username, email, password });
    res.status(201).json({
      message: "Регистрация прошла успешно",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Логин пользователя
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Введите email и пароль" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Неверный email или пароль" });
    }

    res.json({
      message: "Успешный вход",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Получение всех пользователей
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Удаление пользователя
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "Пользователь не найден" });
    res.json({ message: "Пользователь удалён" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
