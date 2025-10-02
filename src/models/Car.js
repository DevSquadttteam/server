import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  make: { type: String, required: true }, // Марка
  model: { type: String, required: true }, // Модель
  year: { type: Number, required: true },  // Год выпуска
  pricePurchase: { type: Number, required: true }, // Цена покупки

  // Продажа
  priceSale: { type: Number, default: 0 }, 
  saleType: { 
    type: String, 
    enum: ["cash", "monthly", "monthlyWithDownPayment"], 
    default: "cash" 
  },
  downPayment: { type: Number, default: 0 }, 
  monthlyPayment: { type: Number, default: 0 }, 

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Car", carSchema);
