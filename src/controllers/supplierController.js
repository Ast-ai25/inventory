// controllers/supplierController.js
const { models } = require('../models');
const Supplier = models.Supplier;
const Country = models.Country;
const State = models.State;
const City = models.City;

exports.getAll = async (req, res) => {
    try {
        const data = await Supplier.findAll({
            include: [Country, State, City],
            order: [['id', 'DESC']]
        });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch suppliers' });
    }
};

exports.getById = async (req, res) => {
    try {
        const item = await Supplier.findByPk(req.params.id, {
            include: [Country, State, City]
        });
        if (!item) return res.status(404).json({ message: 'Supplier not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching supplier' });
    }
};

exports.create = async (req, res) => {
    try {
        const created = await Supplier.create(req.body);
        res.status(201).json(created);
    } catch (err) {
        res.status(400).json({ message: 'Create failed', error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const item = await Supplier.findByPk(req.params.id);
        if (!item) return res.status(404).json({ message: 'Supplier not found' });
        await item.update(req.body);
        res.json(item);
    } catch (err) {
        res.status(400).json({ message: 'Update failed', error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const item = await Supplier.findByPk(req.params.id);
        if (!item) return res.status(404).json({ message: 'Supplier not found' });
        await item.destroy();
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Delete failed' });
    }
};
