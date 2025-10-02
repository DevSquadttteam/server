const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// 📌 Получить все машины
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении машин' });
  }
});

// 📌 Добавить машину
router.post('/', async (req, res) => {
  try {
    const { make, model, year, pricePurchase } = req.body;
    const car = new Car({ make, model, year, pricePurchase, status: 'available' });
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка при добавлении машины' });
  }
});

// 📌 Обновить машину (например аренда/продажа)
router.put('/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) return res.status(404).json({ message: 'Машина не найдена' });
    res.json(car);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка при обновлении машины' });
  }
});

// 📌 Удалить машину
router.delete('/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: 'Машина не найдена' });
    res.json({ message: 'Машина удалена' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при удалении машины' });
  }
});

module.exports = router;
