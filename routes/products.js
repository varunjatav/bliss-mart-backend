const express = require('express');
const router = express.Router();
const findProducts = require('../controller/products');

router.get('/products', findProducts);


module.exports = router;
