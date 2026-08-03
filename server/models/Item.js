const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  lowStockThreshold: {
    type: Number,
    default: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;