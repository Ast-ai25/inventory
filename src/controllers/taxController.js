const Tax = require('../models/Tax');
const Country = require('../models/Country');

// Get all taxes
exports.getAllTaxes = async (req, res) => {
    try {
        console.log('Attempting to fetch taxes with Country include');
        const taxes = await Tax.findAll({ 
            include: [{
                model: Country,
                as: 'Country'
            }]
        });
        console.log('Successfully fetched taxes:', taxes.length);
        res.json(taxes);
    } catch (error) {
        console.error('Error fetching taxes:', error);
        res.status(500).json({ 
            error: 'Failed to fetch taxes',
            details: error.message 
        });
    }
};

// Create tax
exports.createTax = async (req, res) => {
    try {
        const tax = await Tax.create(req.body);
        res.status(201).json(tax);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create tax' });
    }
};

// Get single tax
exports.getTaxById = async (req, res) => {
    try {
        const tax = await Tax.findByPk(req.params.id, { 
            include: [{
                model: Country,
                as: 'Country'
            }]
        });
        if (!tax) return res.status(404).json({ error: 'Tax not found' });
        res.json(tax);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tax' });
    }
};

// Update tax
exports.updateTax = async (req, res) => {
    try {
        const tax = await Tax.findByPk(req.params.id);
        if (!tax) return res.status(404).json({ error: 'Tax not found' });

        await tax.update(req.body);
        res.json(tax);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update tax' });
    }
};

// Delete tax
exports.deleteTax = async (req, res) => {
    try {
        const tax = await Tax.findByPk(req.params.id);
        if (!tax) return res.status(404).json({ error: 'Tax not found' });

        await tax.destroy();
        res.json({ message: 'Tax deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete tax' });
    }
};
