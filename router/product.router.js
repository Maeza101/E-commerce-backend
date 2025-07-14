const express = require('express');
const router = express.Router();
const { getAllProducts, newProduct,
} = require('../controller/product.controller');
const upload = require('../middleware/multer');

router.route(`/newproduct`).post(upload, newProduct);
router.route(`/allproducts`).get(getAllProducts);

module.exports = router;