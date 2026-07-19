const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createReservation,
  myReservations,
  allReservations,
  cancelReservation
} = require("../controllers/reservationController");

router.post("/", auth, createReservation);

router.get("/my", auth, myReservations);

router.get("/", auth, admin, allReservations);
router.put("/:id/cancel", auth, cancelReservation);

module.exports = router;
