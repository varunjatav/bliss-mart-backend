const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  gender: { type: String, required: true },
  product_name: { type: String, required: true },
  product_brand: { type: String, required: true },
  product_price: { type: Number, required: true },
  product_details: { type: String, required: true },
  prooduct_image: { type: String, required: true},
  images: {
    img_url1: { type: String},
    img_url2: { type: String},
    img_url3: { type: String},
    img_url4: { type: String},
  },
  product_discount: Number,
  product_qty: Number,
  product_category: { type: String, required: true},
});

module.exports = mongoose.model("products", productSchema);
