const Car = require('../models/carModel');
const Transaction = require('../models/transactionModel');

exports.addCar = async (req, res) => {
  const { make, model, year, pricePurchase } = req.body;

  if (!make || !model || !year || !pricePurchase) {
    return res.status(400).json({ message: "Все поля обязательны" });
  }

  if (year < 1900 || year > new Date().getFullYear() + 1) {
    return res.status(400).json({ message: "Неверный год" });
  }

  if (pricePurchase <= 0) {
    return res.status(400).json({ message: "Цена должна быть больше 0" });
  }

  const car = new Car(req.body);
  await car.save();
  res.status(201).json(car);
};

exports.getCars = async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Машина не найдена' });
    }
    res.json({ message: 'Машина удалена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении' });
  }
};
