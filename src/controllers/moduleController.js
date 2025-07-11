const Module = require('../models/Module');

// Create a new module
exports.createModule = async (req, res) => {
    try {
        const module = await Module.create(req.body);
        res.status(201).json(module);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all modules
exports.getAllModules = async (req, res) => {
    try {
        const modules = await Module.findAll();
        res.status(200).json(modules);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single module by ID
exports.getModuleById = async (req, res) => {
    try {
        const module = await Module.findByPk(req.params.id);
        if (module) {
            res.status(200).json(module);
        } else {
            res.status(404).json({ error: 'Module not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a module
exports.updateModule = async (req, res) => {
    try {
        const [updated] = await Module.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedModule = await Module.findByPk(req.params.id);
            res.status(200).json(updatedModule);
        } else {
            res.status(404).json({ error: 'Module not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a module
exports.deleteModule = async (req, res) => {
    try {
        const deleted = await Module.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Module not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
