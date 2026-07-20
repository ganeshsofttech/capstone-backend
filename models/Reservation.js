const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    date: String,

    time: String,

    tableNumber: Number,

    guests: Number,
    status: {
      type: String,
      enum: ["Active", "Cancelled"],
      default: "Active",
    },
    reservationStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Reservation", reservationSchema);
