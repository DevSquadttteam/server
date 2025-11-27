// src/routes/carRoutes.js
import express from "express";
import Car from "../models/Car.js";

const router = express.Router();

// GET all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при получении машин" });
  }
});

// ADD car
router.post("/", async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ message: "Ошибка при добавлении машины" });
  }
});

// SELL car
router.post("/:id/sell", async (req, res) => {
  try {
    const { soldTo, priceSale, saleType, downPayment = 0, monthlyPayment = 0, saleCurrency = "USD" } = req.body;

    if (!soldTo || typeof priceSale === "undefined" || !saleType) {
      return res.status(400).json({ message: "Не переданы обязательные поля: soldTo, priceSale, saleType" });
    }

    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Машина не найдена" });

    car.soldTo = soldTo;
    car.priceSale = Number(priceSale);
    car.saleType = saleType;
    car.downPayment = Number(downPayment);
    car.monthlyPayment = Number(monthlyPayment);
    car.saleCurrency = saleCurrency;

    // Статус: наличные → sold, рассрочка → rented
    if (saleType === "cash") car.status = "sold";
    else car.status = "rented";

    await car.save();

    res.json({ message: "Операция продажи выполнена", car });
  } catch (err) {
    console.error("Ошибка продажи:", err);
    res.status(500).json({ message: "Ошибка при продаже машины" });
  }
});

// COMPLETE rent / рассрочка закончена
router.post("/:id/complete", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Машина не найдена" });

    car.status = "sold";
    await car.save();

    res.json({ message: "Статус изменён на sold", car });
  } catch (err) {
    console.error("Ошибка завершения рассрочки:", err);
    res.status(500).json({ message: "Ошибка при завершении рассрочки" });
  }
});

// UPDATE car
router.put("/:id", async (req, res) => {
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

    if (!updatedCar) return res.status(404).json({ message: "Машина не найдена" });

    res.json(updatedCar);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при обновлении машины" });
  }
});

// DELETE car
router.delete("/:id", async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: "Машина не найдена" });
    res.json({ message: "Машина удалена" });
  } catch (err) {
    res.status(500).json({ message: "Ошибка при удалении машины" });
  }
});

export default router;
