const express = require("express");

const router = express.Router();

const controller = require("../controllers/userController");

router.post("/createUser", controller.createUser);

router.get("/getUser", controller.getUsers);

// router.get("/", controller.getUsersById);


module.exports = router;
