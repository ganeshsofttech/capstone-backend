const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createFeedback,
  getAllFeedback,
  deleteFeedback,
  getMyFeedback,
  updateFeedback,
  addAdminComment,
} = require("../controllers/feedbackController");

router.post("/", auth, createFeedback);
router.get("/my-feedback", auth, getMyFeedback);
router.get("/", auth, getAllFeedback);
router.delete("/:id", auth, admin, deleteFeedback);
router.put("/:id", auth, updateFeedback);
router.put("/:id/comment", auth, addAdminComment);
module.exports = router;
