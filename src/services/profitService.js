const Transaction = require('../models/transactionModel');

exports.calculateProfit = async () => {
  const transactions = await Transaction.find();
  let income = 0;
  let expenses = 0;

  transactions.forEach(tx => {
    if (tx.type === 'purchase') expenses += tx.amount;
    else income += tx.amount;
  });

  return income - expenses;
};
