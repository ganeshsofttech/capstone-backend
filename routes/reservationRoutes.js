const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createReservation,
  myReservations,
  allReservations,
  cancelReservation,
  updateReservationStatus,
} = require("../controllers/reservationController");

router.post("/", auth, createReservation);

router.get("/my", auth, myReservations);

router.get("/", auth, admin, allReservations);
router.put("/:id/cancel", auth, cancelReservation);
router.put("/:id/reservationStatus", updateReservationStatus);
module.exports = router;
