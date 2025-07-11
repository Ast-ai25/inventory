const PackageUnit = require('../models/PackageUnit');
exports.getActivePackageUnits = async (req, res) => {
    try {
        const units = await PackageUnit.findAll({ where: { is_active: true } });
        res.json(units);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching package units' });
    }
};
exports.getActiveMeasureUnits = async (req, res) => {
    try {
        const units = await MeasureUnit.findAll({ where: { is_active: true } });
        res.json(units);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching measure units' });
    }
};
// Get all units
exports.getAll = async (req, res) => {
    try {
        const units = await PackageUnit.findAll();
        res.json(units);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch package units' });
    }
};

// Create new unit
exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const unit = await PackageUnit.create({ name });
        res.status(201).json(unit);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create package unit' });
    }
};

// Update existing unit
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        await PackageUnit.update({ name }, { where: { id } });
        res.json({ message: 'Package unit updated successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to update package unit' });
    }
};

// Delete unit
exports.remove = async (req, res) => {
    try {
        const { id } = req.params;
        await PackageUnit.destroy({ where: { id } });
        res.json({ message: 'Package unit deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete package unit' });
    }
};
