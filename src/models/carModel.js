const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  pricePurchase: Number,
  priceSale: Number,
  status: {
    type: String,
    enum: ['available', 'sold', 'rented'],
    default: 'available'
  },
  saleType: {
    type: String,
    enum: ['cash', 'monthly', 'monthlyWithDownPayment']
  },
  downPayment: Number,
  monthlyPayment: Number,
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner'
  }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
