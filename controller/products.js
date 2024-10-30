const productSchema = require('../model/products')

const findProducts = async(req, res) => {
    try {
        const productData = await productSchema.find({});
        return res.status(200).json(productData)
    } catch (error) {
        console.log(error);
    }
};


module.exports = findProducts;