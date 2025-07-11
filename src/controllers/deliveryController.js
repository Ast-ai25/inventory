const Delivery = require('../models/Delivery');
const Country = require('../models/Country');

exports.getAllDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.findAll({ include: [{ model: Country, as: 'Country' }] });
        res.json(deliveries);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch deliveries', details: err.message });
    }
};

exports.createDelivery = async (req, res) => {
    try {
        const delivery = await Delivery.create(req.body);
        res.status(201).json(delivery);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create delivery', details: err.message });
    }
};

exports.getDeliveryById = async (req, res) => {
    try {
        const delivery = await Delivery.findByPk(req.params.id, { include: [{ model: Country, as: 'Country' }] });
        if (!delivery) return res.status(404).json({ error: 'Delivery not found' });
        res.json(delivery);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch delivery', details: err.message });
    }
};

exports.updateDelivery = async (req, res) => {
    try {
        const delivery = await Delivery.findByPk(req.params.id);
        if (!delivery) return res.status(404).json({ error: 'Delivery not found' });
        await delivery.update(req.body);
        res.json(delivery);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update delivery', details: err.message });
    }
};

exports.deleteDelivery = async (req, res) => {
    try {
        const delivery = await Delivery.findByPk(req.params.id);
        if (!delivery) return res.status(404).json({ error: 'Delivery not found' });
        await delivery.destroy();
        res.json({ message: 'Delivery deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete delivery', details: err.message });
    }
};
