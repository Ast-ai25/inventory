const PaymentMode = require('../models/PaymentMode');
const Country = require('../models/Country');

exports.getAllPaymentModes = async (req, res) => {
    try {
        const paymentModes = await PaymentMode.findAll({ include: [{ model: Country, as: 'Country' }] });
        res.json(paymentModes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch payment modes', details: err.message });
    }
};

exports.createPaymentMode = async (req, res) => {
    try {
        const pm = await PaymentMode.create(req.body);
        res.status(201).json(pm);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create payment mode', details: err.message });
    }
};

exports.getPaymentModeById = async (req, res) => {
    try {
        const pm = await PaymentMode.findByPk(req.params.id, { include: [{ model: Country, as: 'Country' }] });
        if (!pm) return res.status(404).json({ error: 'Payment mode not found' });
        res.json(pm);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch payment mode', details: err.message });
    }
};

exports.updatePaymentMode = async (req, res) => {
    try {
        const pm = await PaymentMode.findByPk(req.params.id);
        if (!pm) return res.status(404).json({ error: 'Payment mode not found' });
        await pm.update(req.body);
        res.json(pm);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update payment mode', details: err.message });
    }
};

exports.deletePaymentMode = async (req, res) => {
    try {
        const pm = await PaymentMode.findByPk(req.params.id);
        if (!pm) return res.status(404).json({ error: 'Payment mode not found' });
        await pm.destroy();
        res.json({ message: 'Payment mode deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete payment mode', details: err.message });
    }
};
