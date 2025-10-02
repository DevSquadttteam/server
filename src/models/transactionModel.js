// models/transactionModel.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  },
  type: {
    type: String,
    enum: ['purchase', 'sale', 'rental']
  },
  amount: Number,
  date: {
    type: Date,
    default: Date.now
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'monthly', 'monthlyWithDownPayment']
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
