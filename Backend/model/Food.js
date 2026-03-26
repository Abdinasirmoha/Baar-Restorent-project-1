const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: ""
  },
  category: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Food", FoodSchema);