const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getMenus,
  getMenuById,
  searchMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menuController");

router.get("/", getMenus);

router.get("/search", searchMenu);

router.get("/:id", getMenuById);

router.post("/", auth, admin, createMenu);

router.put("/:id", auth, admin, updateMenu);

router.delete("/:id", auth, admin, deleteMenu);

module.exports = router;
