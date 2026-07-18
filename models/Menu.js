const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: String,

    description: String,

    price: Number,

    category: String,

    image: String,

    availability: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Menu", menuSchema);
