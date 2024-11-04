const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
    product_name: { type: String, required: true },
    product_brand: { type: String, required: true },
    product_price: { type: Number, required: true },
    product_details: { type: String, required: true },
    product_image: { type: String, required: true},
    product_discount: Number,
    product_qty: Number,
    product_category: { type: String, required: true},
});

module.exports = mongoose.model('cart', cartSchema);