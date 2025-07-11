const Service = require('../models/Service');
const Country = require('../models/Country');

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll({ include: [{ model: Country, as: 'Country' }] });
        res.json(services);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch services', details: err.message });
    }
};

exports.createService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json(service);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create service', details: err.message });
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id, { include: [{ model: Country, as: 'Country' }] });
        if (!service) return res.status(404).json({ error: 'Service not found' });
        res.json(service);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch service', details: err.message });
    }
};

exports.updateService = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) return res.status(404).json({ error: 'Service not found' });
        await service.update(req.body);
        res.json(service);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update service', details: err.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) return res.status(404).json({ error: 'Service not found' });
        await service.destroy();
        res.json({ message: 'Service deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete service', details: err.message });
    }
};
