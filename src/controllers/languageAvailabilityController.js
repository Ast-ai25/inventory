const { models } = require('../models');
const LanguageAvailability = models.LanguageAvailability;
const Language = models.Language;
const Country = models.Country;
const State = models.State;

// Create new language availability
exports.createLanguageAvailability = async (req, res) => {
    try {
        const availability = await LanguageAvailability.create(req.body);
        res.status(201).json(availability);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all language availabilities
exports.getAllLanguageAvailabilities = async (req, res) => {
    try {
        const availabilities = await LanguageAvailability.findAll({
            include: [
                { model: Language },
                { model: Country },
                { model: State }
            ]
        });
        res.status(200).json(availabilities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get single availability by ID
exports.getLanguageAvailabilityById = async (req, res) => {
    try {
        const availability = await LanguageAvailability.findByPk(req.params.id, {
            include: [
                { model: Language },
                { model: Country },
                { model: State }
            ]
        });
        if (availability) {
            res.status(200).json(availability);
        } else {
            res.status(404).json({ error: 'Language availability not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update language availability
exports.updateLanguageAvailability = async (req, res) => {
    try {
        const [updated] = await LanguageAvailability.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedAvailability = await LanguageAvailability.findByPk(req.params.id);
            res.status(200).json(updatedAvailability);
        } else {
            res.status(404).json({ error: 'Language availability not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete language availability
exports.deleteLanguageAvailability = async (req, res) => {
    try {
        const deleted = await LanguageAvailability.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Language availability not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
