const Product = require("../models/Product");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Brand = require("../models/Brand");
const authMiddleware = require("../middleware/authMiddleware");
const MeasureUnit = require("../models/MeasureUnit");
const PackageUnit = require("../models/PackageUnit");

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            where: { company_id: req.tenant.id },
            include: [
                Category,
                Subcategory,
                Brand,
                { model: MeasureUnit, through: { attributes: [] }, paranoid: false },
                { model: PackageUnit, through: { attributes: [] }, paranoid: false }
            ]
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
};

// Get single product
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: { 
                id: req.params.id,
                company_id: req.tenant.id 
            },
            include: [
                Category,
                Subcategory,
                Brand,
                { model: MeasureUnit, through: { attributes: [] }, paranoid: false },
                { model: PackageUnit, through: { attributes: [] }, paranoid: false }
            ]
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
        const { measure_unit_ids, package_unit_ids, ...productData } = req.body;
        const product = await Product.create({
            ...productData,
            company_id: req.tenant.id
        });

        if (measure_unit_ids?.length) {
            await product.setMeasureUnits(measure_unit_ids);
        }
        if (package_unit_ids?.length) {
            await product.setPackageUnits(package_unit_ids);
        }

        res.status(201).json(product);
    } catch (error) {
        console.error("Create Product Error:", error);
        res.status(400).json({ message: "Error creating product", error: error.message });
    }
};

// Update product
// Create new product
// exports.createProduct = async (req, res) => {
//     try {
//         const { measure_unit_ids, package_unit_ids, ...productData } = req.body;
//         const product = await Product.create(productData);

//         if (measure_unit_ids?.length) {
//             await product.setMeasureUnits(measure_unit_ids);
//         }
//         if (package_unit_ids?.length) {
//             await product.setPackageUnits(package_unit_ids);
//         }

//         res.status(201).json(product);
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ message: "Error creating product" });
//     }
// };

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id,
                company_id: req.tenant.id
            }
        });
        if (!product) return res.status(404).json({ message: "Product not found" });

        const { measure_unit_ids, package_unit_ids, ...rest } = req.body;
        await product.update(rest);

        if (measure_unit_ids) {
            await product.setMeasureUnits(measure_unit_ids);
        }
        if (package_unit_ids) {
            await product.setPackageUnits(package_unit_ids);
        }

        res.json(product);
    } catch (error) {
        console.error("Update Product Error:", error);
        res.status(400).json({ message: "Error updating product", error: error.message });
    }
};


// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id,
                company_id: req.tenant.id
            }
        });
        if (!product) return res.status(404).json({ message: "Product not found" });

        await product.destroy();
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product" });
    }
};
