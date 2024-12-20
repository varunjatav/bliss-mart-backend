const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
        quantity: Number,
    }],
});

module.exports = mongoose.model('cart', cartSchema);