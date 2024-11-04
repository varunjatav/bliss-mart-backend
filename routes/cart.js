const express = require("express");
const {
  postToCartContoller,
  getCartController,
} = require("../controller/cart");
const router = express.Router();
// const cartSchema = require("../model/cart");

router.post("/cart", postToCartContoller);

router.get("/cart", getCartController);

module.exports = router;
