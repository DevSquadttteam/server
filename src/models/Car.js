import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  make: { type: String, required: true }, // Марка
  model: { type: String, required: true }, // Модель
  year: { type: Number, required: true },  // Год

  // Покупка
  pricePurchase: { type: Number, required: true }, // Цена покупки
  purchaseCurrency: { 
    type: String, 
    enum: ["USD", "UZS"], 
    default: "USD" 
  },
  boughtFrom: { type: String, default: "" }, // У кого куплено

  // Продажа
  priceSale: { type: Number, default: 0 }, 
  saleCurrency: { 
    type: String, 
    enum: ["USD", "UZS"], 
    default: "USD" 
  },
  soldTo: { type: String, default: "" }, // Кому продано

  // Тип продажи
  saleType: { 
    type: String, 
    enum: ["cash", "monthly", "monthlyWithDownPayment"], 
    default: "cash" 
  },

  // Если в рассрочку
  downPayment: { type: Number, default: 0 }, 
  monthlyPayment: { type: Number, default: 0 }, 

  // Статус
  status: {
    type: String,
    enum: ["available", "sold", "rented"],
    default: "available"
  },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Car", carSchema);
