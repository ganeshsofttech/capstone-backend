const Reservation = require("../models/Reservation");

exports.createReservation = async (req, res) => {
  // if (!date || !time || !tableNumber || !guests) {
  //   return res.status(400).json({
  //     message: "All fields are required",
  //   });
  // }
  const reservations = await Reservation.find({
    userId: req.user.id,
    status: "Active",
  });
  if (reservations.length > 0) {
    return res
      .status(400)
      .json({ success: false, error: "Already having reservation" });
  }
  if (req.body.guests < 1) {
    return res.status(400).json({
      message: "Guests must be at least 1",
    });
  }
  const reservation = await Reservation.create({
    ...req.body,
    userId: req.user.id,
  });

  res.status(201).json(reservation);
};

exports.myReservations = async (req, res) => {
  const reservations = await Reservation.find({
    userId: req.user.id,
  });

  res.json(reservations);
};

exports.allReservations = async (req, res) => {
  const reservations = await Reservation.find();

  res.json(reservations);
};
exports.cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    reservation.status = "Cancelled";
    await reservation.save();

    res.json({
      success: true,
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
