const productSchema = require("../model/products");

const findProducts = async (req, res) => {
  try {
    console.log("request query", req.query);
    if(req.query.page && req.query.limit)
    {
        req.query.page = +(req.query.page || 0);
        req.query.limit = +(req.query.limit || 5);
        var startIndex = (req.query.page - 1) * req.query.limit;
        var endIndex = req.query.page * req.query.limit;
    }
    
    

    let excludeFields = ["sort", "page", "limit", "fields"];

    let queryObj = { ...req.query };

    console.log("query object", queryObj);

    excludeFields.forEach((field) => {
      delete queryObj[field];
    });
    console.log(req.query);

    let QueryString = JSON.stringify(queryObj);
    QueryString = QueryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    QueryString = JSON.parse(QueryString);
    console.log("query string", QueryString);

    const productData = await productSchema.find(QueryString);
    let products = productData.slice(startIndex, endIndex);
    console.log("products",products.length);

    // console.log(productData);
    return res.status(200).json({
      status: "success",
      length: productData.length,
      productData: productData,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "failure", message: error.message });
  }
};

module.exports = findProducts;
