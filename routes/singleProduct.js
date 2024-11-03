const express = require('express');
const singleProduct = require('../controller/singleProduct');
const router = express.Router();

router.get('/singleproduct/:productId', singleProduct);

module.exports = router;