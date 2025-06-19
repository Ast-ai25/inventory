const Product = require("../models/Product");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Brand = require("../models/Brand");
const authMiddleware = require("../middleware/authMiddleware");

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [Category, Subcategory, Brand]
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
};

// Get single product
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [Category, Subcategory, Brand]
        });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product" });
    }
};

// Create new product
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: "Error creating product" });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        await product.update(req.body);
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: "Error updating product" });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        await product.destroy();
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product" });
    }
};
