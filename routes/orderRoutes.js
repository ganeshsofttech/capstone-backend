const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateStatus,
  cancelOrder,
} = require("../controllers/orderController");

router.post("/", auth, createOrder);

router.get("/my-orders", auth, getMyOrders);

router.get("/", auth, admin, getAllOrders);

router.patch("/:id/status", auth, admin, updateStatus);

router.put("/:id/cancel", auth, cancelOrder);

module.exports = router;
