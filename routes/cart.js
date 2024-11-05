const express = require("express");
const {
  postToCartContoller,
  getCartController,
  removeFromCart,
  decrementCart,
} = require("../controller/cart");
const router = express.Router();
// const cartSchema = require("../model/cart");

router.post("/cart", postToCartContoller);

router.get("/cart", getCartController);

router.delete('/cart/delete', removeFromCart);
router.delete('/cart/decrement', decrementCart);

module.exports = router;
