const { models } = require('../models');
const Language = models.Language;

// Create a new language
exports.createLanguage = async (req, res) => {
    try {
        const language = await Language.create(req.body);
        res.status(201).json(language);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all languages
exports.getAllLanguages = async (req, res) => {
    try {
        const languages = await Language.findAll();
        res.status(200).json(languages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single language by ID
exports.getLanguageById = async (req, res) => {
    try {
        const language = await Language.findByPk(req.params.id);
        if (language) {
            res.status(200).json(language);
        } else {
            res.status(404).json({ error: 'Language not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a language
exports.updateLanguage = async (req, res) => {
    try {
        const [updated] = await Language.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedLanguage = await Language.findByPk(req.params.id);
            res.status(200).json(updatedLanguage);
        } else {
            res.status(404).json({ error: 'Language not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a language
exports.deleteLanguage = async (req, res) => {
    try {
        const deleted = await Language.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Language not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
