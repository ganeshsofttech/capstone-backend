const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createReservation,
  myReservations,
  allReservations,
} = require("../controllers/reservationController");

router.post("/", auth, createReservation);

router.get("/my", auth, myReservations);

router.get("/", auth, admin, allReservations);

module.exports = router;
