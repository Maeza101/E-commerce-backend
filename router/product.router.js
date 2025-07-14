const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    newProduct,
    getProductById,
    updateProductById
} = require('../controller/product.controller');
const upload = require('../middleware/multer');

router.post('/newproduct', upload, newProduct);
router.get('/allproducts', getAllProducts);
router.get('/:id', getProductById); // ✅ View product by ID
router.put('/:id', upload, updateProductById); // ✅ Update product by ID


module.exports = router;