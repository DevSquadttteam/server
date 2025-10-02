const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  date: { type: Date, default: Date.now },
  description: { type: String }
});

// ❗ вместо простого mongoose.model()
module.exports = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
