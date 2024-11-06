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
   
    if (findIndex > -1) {
      cart.items[findIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity: quantity });
    }

    await cart.save();
    res.status(200).json({
      status: "success",
      cart: cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCartController = async (req, res) => {
  const userId = req.query.userId; // Get userId from query parameters
 
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

// Remove item from cart
const removeFromCart = async (req, res) => {
  const { productId, userId } = req.query;
  console.log("Removing item from cart", productId, userId);
  
  try {
    const cart = await cartSchema.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    console.log("cart", cart);
    

    const itemIndex = cart.items.findIndex((item) =>
      item.product.equals(productId)
    );
    console.log("intem index", itemIndex);
    
    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      return res.status(200).json(cart);
    }

    res.status(404).json({ message: "Product not found in cart" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: error.message });
  }
};

// decrement cart
const decrementCart = async (req, res) => {
  const { productId, userId } = req.query;
  console.log(productId, userId);

  // const {userId} = req.query;
  // console.log("userId: ", userId);

  try {
    let cart = await cartSchema.findOne({ user: userId });
    console.log(cart);
    
    if (!cart) {
      return res.status(400).json({ message:"User Cart not found"});
    }
    const quantity = 1;

    const product = await productSchema.findById(productId);
    console.log(product);

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    const itemIndex = cart.items.findIndex((cartItem) =>
      cartItem.product.equals(productId)
    );
    console.log("itemIndex: ", cart.items[itemIndex].quantity);

    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= quantity;
    } else {
      cart.items.splice(itemIndex, 1);
    }
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postToCartContoller,
  getCartController,
  removeFromCart,
  decrementCart,
};
