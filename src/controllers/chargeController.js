const Charge = require('../models/Charge');
const Country = require('../models/Country');

exports.getAllCharges = async (req, res) => {
    try {
        const charges = await Charge.findAll({ include: [{ model: Country, as: 'Country' }] });
        res.json(charges);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch charges', details: err.message });
    }
};

exports.createCharge = async (req, res) => {
    try {
        const charge = await Charge.create(req.body);
        res.status(201).json(charge);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create charge', details: err.message });
    }
};

exports.getChargeById = async (req, res) => {
    try {
        const charge = await Charge.findByPk(req.params.id, { include: [{ model: Country, as: 'Country' }] });
        if (!charge) return res.status(404).json({ error: 'Charge not found' });
        res.json(charge);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch charge', details: err.message });
    }
};

exports.updateCharge = async (req, res) => {
    try {
        const charge = await Charge.findByPk(req.params.id);
        if (!charge) return res.status(404).json({ error: 'Charge not found' });
        await charge.update(req.body);
        res.json(charge);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update charge', details: err.message });
    }
};

exports.deleteCharge = async (req, res) => {
    try {
        const charge = await Charge.findByPk(req.params.id);
        if (!charge) return res.status(404).json({ error: 'Charge not found' });
        await charge.destroy();
        res.json({ message: 'Charge deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete charge', details: err.message });
    }
};
