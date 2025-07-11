const { models } = require('../models');
const Brand = models.Brand;
const Category = models.Category;
const Country = models.Country;

// Create a new brand
exports.createBrand = async (req, res) => {
    try {
        const { name, category_id, country_id } = req.body;
        const brand = await Brand.create({ name, category_id, country_id });
        res.status(201).json(brand);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all brands
exports.getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.findAll({ include: [Category, Country] });
        res.status(200).json(brands);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single brand by ID
exports.getBrandById = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id, { include: [Category, Country] });
        if (brand) {
            res.status(200).json(brand);
        } else {
            res.status(404).json({ error: 'Brand not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a brand
exports.updateBrand = async (req, res) => {
    try {
        const [updated] = await Brand.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedBrand = await Brand.findByPk(req.params.id);
            res.status(200).json(updatedBrand);
        } else {
            res.status(404).json({ error: 'Brand not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a brand
exports.deleteBrand = async (req, res) => {
    try {
        const deleted = await Brand.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Brand not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
