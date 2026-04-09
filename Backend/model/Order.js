const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    total: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    fullName: {
      type: String,
      default: "Walk-in Customer"
    },

    phone: {
      type: String,
      default: "N/A"
    },

    paymentMethod: {
      type: String,
      default: "cod" // 'cod' or 'card'
    },

    status: {
      type: String,
      enum: ["PENDING", "COOKING", "DELIVERED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);