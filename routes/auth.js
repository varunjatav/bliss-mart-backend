const express = require("express");
const { signUp, login, refreshToken } = require("../controller/auth");
const { signUpValidator, loginValidator } = require("../middleware/validator");
const router = express.Router();

router.post("/signup", signUpValidator, signUp);
router.post("/login", loginValidator, login);
router.post("/refresh", refreshToken);

module.exports = router;
