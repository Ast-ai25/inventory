const { sequelize } = require('../config/database');
const PackageModulePermission = require('../models/PackageModulePermission');
const Package = require('../models/Package');
const Module = require('../models/Module');
const Permission = require('../models/Permission');
const { Op } = require('sequelize');

// Helper function to validate package-module-permission relationship
async function validateRelations(packageId, moduleId, permissionId) {
    const [packageExists, moduleExists, permissionExists] = await Promise.all([
        Package.findByPk(packageId),
        Module.findByPk(moduleId),
        Permission.findByPk(permissionId)
    ]);

    if (!packageExists) throw new Error('Package not found');
    if (!moduleExists) throw new Error('Module not found');
    if (!permissionExists) throw new Error('Permission not found');
}

exports.getAll = async (req, res) => {
    try {
        const data = await PackageModulePermission.findAll({
            include: [
                { model: Package, as: 'Package' },
                { model: Module, as: 'Module' },
                { model: Permission, as: 'Permission' }
            ]
        });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Fetch failed', details: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const item = await PackageModulePermission.findByPk(req.params.id, {
            include: [
                { model: Package, as: 'Package' },
                { model: Module, as: 'Module' },
                { model: Permission, as: 'Permission' }
            ]
        });
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: 'Fetch failed', details: err.message });
    }
};

exports.getByPackage = async (req, res) => {
    try {
        const items = await PackageModulePermission.findAll({
            where: { package_id: req.params.packageId },
            include: [
                { model: Package, as: 'Package' },
                { model: Module, as: 'Module' },
                { model: Permission, as: 'Permission' }
            ]
        });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Fetch failed', details: err.message });
    }
};

exports.createBatch = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        if (!Array.isArray(req.body)) {
            return res.status(400).json({ error: 'Expected an array of permissions' });
        }

        // Validate all relationships first
        for (const item of req.body) {
            await validateRelations(item.package_id, item.module_id, item.permission_id);
        }

        const createdItems = [];
        for (const item of req.body) {
            const created = await PackageModulePermission.create(item, { transaction: t });
            createdItems.push(created);
        }

        await t.commit();
        res.status(201).json(createdItems);
    } catch (err) {
        await t.rollback();
        res.status(400).json({
            error: 'Create failed',
            details: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};

exports.deleteByPackage = async (req, res) => {
    try {
        const count = await PackageModulePermission.destroy({
            where: { package_id: req.params.packageId }
        });
        res.json({ message: `Deleted ${count} permissions` });
    } catch (err) {
        res.status(500).json({ error: 'Delete failed', details: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { package_id, module_id, permission_id } = req.body;
        await validateRelations(package_id, module_id, permission_id);

        const created = await PackageModulePermission.create(req.body);
        res.status(201).json(created);
    } catch (err) {
        res.status(400).json({
            error: 'Create failed',
            details: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};

exports.update = async (req, res) => {
    try {
        const item = await PackageModulePermission.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });

        const { package_id, module_id, permission_id } = req.body;
        await validateRelations(package_id, module_id, permission_id);

        await item.update(req.body);
        res.json(item);
    } catch (err) {
        res.status(400).json({
            error: 'Update failed',
            details: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const item = await PackageModulePermission.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });

        await item.destroy();
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({
            error: 'Delete failed',
            details: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};
