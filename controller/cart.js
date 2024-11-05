const cartSchema = require("../model/cart");
const productSchema = require("../model/products");
const userSchema = require("../model/user");

const postToCartContoller = async (req, res) => {
  const userId = req.body.userId;
  console.log("user Id from auth request: ", userId);

  // Convert request body object to an array
  const { _id: productId } = req.body;
  try {
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let cart = await cartSchema.findOne({ user: userId });
    if (!cart) {
      cart = new cartSchema({ user: userId, items: [] });
    }
    const quantity = 1;
    const product = await productSchema.findById({ _id: productId });
    console.log("product found: " + product);

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    const findIndex = cart.items.findIndex((cartItem) =>
      cartItem.product.equals(productId)
    );
    console.log(findIndex);
    if (findIndex > -1) {
      cart.items[findIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity: quantity });
    }

    await cart.save();
    res.status(200).json({
      status:"success",
      cart: cart
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCartController = async (req, res) => {
  const userId = req.body.userId;

  try {
    const cart = await cartSchema
      .findOne({ user: userId })
      .populate("items.product");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { postToCartContoller, getCartController };
