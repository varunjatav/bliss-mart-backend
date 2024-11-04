const cartSchema = require("../model/cart");
const postToCartContoller = async (req, res) => {
  try {
    console.log("request body", req.body);

    const newCart = await cartSchema(req.body);
    newCart.save();

    res.status(201).json({
      status: "success",
      cart: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failiure",
      message: error.message,
    });
  }
};

const getCartController = async (req, res) => {
    try {
      const response = await cartSchema.find({});
      console.log(response);
       res.status(200).json({
          status: "success",
          cart: response
      })
    } catch (error) {
      console.log(error);
       res.status(500).json({
          status: "failiure",
          message: error.message
      });
    }
  }

module.exports = {postToCartContoller, getCartController};
