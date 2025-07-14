const productModel = require(`../model/product.model`);
const cloudinary = require("../config/cloudinary");

// Create new product
const newProduct = async (req, res) => {
    try {
        const { productTitle, price, description } = req.body;
        const productCodeGenerator = Math.floor(Math.random() * 100000000);

        if (!req.file) {
            return res.status(400).json({ message: "Product image is required" });
        }

        const cloudImage = await cloudinary.uploader.upload(req.file.path);

        const productNew = await productModel.create({
            productTitle,
            price,
            description,
            productImage: cloudImage.secure_url,
            productCode: `REDCART - ${productCodeGenerator}`,
        });

        res.status(201).json({
            message: "Product created successfully",
            data: productNew
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Error creating product",
            data: error.message || error
        });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: "Products fetched successfully",
            data: products
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching products",
            data: error.message || error
        });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({
            message: "Product fetched successfully",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching product",
            data: error.message || error
        });
    }
};

const updateProductById = async (req, res) => {
    try {
        const { productTitle, price, description } = req.body;

        let updatedData = { productTitle, price, description };

        if (req.file) {
            // Upload new image to Cloudinary
            const cloudImage = await cloudinary.uploader.upload(req.file.path);
            updatedData.productImage = cloudImage.secure_url;
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true } // return updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

module.exports = {
    newProduct,
    getAllProducts,
    getProductById,
    updateProductById,

};
