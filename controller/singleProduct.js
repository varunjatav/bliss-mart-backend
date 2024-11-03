const productSchema = require('../model/products');

const singleProduct = async(req,res) => {
    try {
        console.log(req.params)
        const response = await productSchema.find({_id:req.params.productId});
        console.log(response);
        res.status(200).send(
            {
                status: "success",
                singleProduct: response
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failure",
            message: error.message
        })
    }
    
};
module.exports = singleProduct;