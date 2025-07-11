const { models } = require('../models');
const Permission = models.Permission;
const Module = models.Module;

exports.getAll = async (req, res) => {
    try {
        const permissions = await Permission.findAll({
            include: [{ model: Module, attributes: ['name'] }]
        });
        res.json(permissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { name, module_id } = req.body;
        const permission = await Permission.create({ name, module_id });
        res.status(201).json(permission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { name, module_id } = req.body;
        const permission = await Permission.findByPk(req.params.id);
        if (!permission) return res.status(404).json({ message: "Permission not found" });

        await permission.update({ name, module_id });
        res.json(permission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const permission = await Permission.findByPk(req.params.id);
        if (!permission) return res.status(404).json({ message: "Permission not found" });

        await permission.destroy();
        res.json({ message: "Permission deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
