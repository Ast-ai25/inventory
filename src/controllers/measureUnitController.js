const MeasureUnit = require('../models/MeasureUnit');

// Get all units
exports.getAll = async (req, res) => {
    try {
        const units = await MeasureUnit.findAll();
        res.json(units);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch measure units' });
    }
};

// Create new unit
exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const unit = await MeasureUnit.create({ name });
        res.status(201).json(unit);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create measure unit' });
    }
};

// Update existing unit
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        await MeasureUnit.update({ name }, { where: { id } });
        res.json({ message: 'Measure unit updated successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to update measure unit' });
    }
};

// Delete unit
exports.remove = async (req, res) => {
    try {
        const { id } = req.params;
        await MeasureUnit.destroy({ where: { id } });
        res.json({ message: 'Measure unit deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete measure unit' });
    }
};
