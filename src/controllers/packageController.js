const Package = require('../models/Package');
const Country = require('../models/Country');

exports.getAllPackages = async (req, res) => {
    try {
        const { country_id } = req.query;
        const whereClause = {};
        if (country_id) {
            whereClause.country_id = country_id;
        }
        const packages = await Package.findAll({ 
            where: whereClause,
            include: [{ model: Country, as: 'Country' }] 
        });
        res.json(packages);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch packages', details: err.message });
    }
};

exports.createPackage = async (req, res) => {
    try {
        const newPackage = await Package.create(req.body);
        res.status(201).json(newPackage);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create package', details: err.message });
    }
};

exports.getPackageById = async (req, res) => {
    try {
        const pkg = await Package.findByPk(req.params.id, { include: [{ model: Country, as: 'Country' }] });
        if (!pkg) return res.status(404).json({ error: 'Package not found' });
        res.json(pkg);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch package', details: err.message });
    }
};

exports.updatePackage = async (req, res) => {
    try {
        const pkg = await Package.findByPk(req.params.id);
        if (!pkg) return res.status(404).json({ error: 'Package not found' });
        await pkg.update(req.body);
        res.json(pkg);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update package', details: err.message });
    }
};

exports.deletePackage = async (req, res) => {
    try {
        const pkg = await Package.findByPk(req.params.id);
        if (!pkg) return res.status(404).json({ error: 'Package not found' });
        await pkg.destroy();
        res.json({ message: 'Package deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete package', details: err.message });
    }
};
