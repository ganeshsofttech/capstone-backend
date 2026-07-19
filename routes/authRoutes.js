const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const { register, login, getUser, updateUser,  deleteUser} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/getUser", getUser);
router.put("/:id", auth, admin, updateUser);
router.delete("/:id", auth, admin, deleteUser);
module.exports = router;
