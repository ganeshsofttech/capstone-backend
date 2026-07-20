const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const upload = require("../middleware/upload");
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

router.post("/", auth, admin,upload.single("image"), createMenu);

router.put("/:id", auth, admin, upload.single("image"),updateMenu);

router.delete("/:id", auth, admin, deleteMenu);

module.exports = router;
