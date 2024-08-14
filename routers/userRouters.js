const express = require("express");
const { registerUsers, loginUsers } = require("../controllers/authControllers");
const router = express.Router();

router.route("/register").post(registerUsers);
router.route("/login").post(loginUsers);

module.exports = router;
