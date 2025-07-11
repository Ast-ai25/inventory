const { models } = require('../models');
const Role = models.Role;
const Permission = models.Permission;

exports.create = async (req, res) => {
    try {
        const { name, permissions } = req.body;
        // For super admin creating global roles
        const company_id = req.user?.role === 'Super Admin' ? null : req.tenant?.id;
        
        // Check if role with same name+company already exists
        const existing = await Role.findOne({ where: { name, company_id } });
        if (existing) {
            return res.status(400).json({ 
                error: `Role '${name}' already exists for this ${company_id ? 'tenant' : 'system'}`
            });
        }

        const role = await Role.create({ 
            name,
            company_id
        });
        if (permissions && permissions.length > 0) {
            await role.setPermissions(permissions);
        }
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const where = {};
        // Show all roles for super admin, tenant-specific for others
        if (req.user?.role !== 'Super Admin' && req.tenant?.id) {
            where.company_id = req.tenant.id;
        }
        const roles = await Role.findAll({ 
            where,
            include: [{ model: Permission, as: 'Permissions' }] 
        });
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const where = { id: req.params.id };
        if (req.tenant?.id) {
            where.company_id = req.tenant.id;
        }
        const role = await Role.findOne({ 
            where,
            include: [{ model: Permission, as: 'Permissions' }] 
        });
        if (!role) return res.status(404).json({ message: "Role not found" });
        res.json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { name, permissions } = req.body;
        const where = { id: req.params.id };
        if (req.tenant?.id) {
            where.company_id = req.tenant.id;
        }
        const role = await Role.findOne({ where });
        if (!role) return res.status(404).json({ message: "Role not found" });

        await role.update({ name });
        if (permissions) {
            await role.setPermissions(permissions);
        }
        res.json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const where = { id: req.params.id };
        if (req.tenant?.id) {
            where.company_id = req.tenant.id;
        }
        const role = await Role.findOne({
            where,
            include: [{ model: Permission, as: 'Permissions' }]
        });
        if (!role) return res.status(404).json({ message: "Role not found" });

        // First remove all permissions associated with this role
        if (role.Permissions && role.Permissions.length > 0) {
            await role.setPermissions([]);
        }

        // Then delete the role
        await role.destroy();
        res.json({ message: "Role deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
