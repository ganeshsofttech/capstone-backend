const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    items: [
      {
        menuId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
        },

        quantity: Number,
      },
    ],

    totalAmount: Number,

    status: {
      type: String,
      enum: ["Pending","Preparing", "Ready", "Delivered", "Cancelled"],
      default: "Preparing",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", orderSchema);
