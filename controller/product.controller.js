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

module.exports = {
    newProduct,
    getAllProducts
};
