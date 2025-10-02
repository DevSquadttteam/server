const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// 📌 Получить все транзакции
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// 📌 Добавить транзакцию
router.post('/', async (req, res) => {
  try {
    const { type, amount, description } = req.body;
    const transaction = new Transaction({ type, amount, description });
    await transaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при добавлении транзакции' });
  }
});

module.exports = router;
