const { models } = require('../models');
const modules = [
    'dashboard', 'user', 'role', 'permission', 'product', 'inventory',
    'category', 'brand', 'supplier', 'sale', 'purchase', 'notification',
    'country', 'state', 'city', 'language', 'rma', 'currency_availability'
];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // 1. Get existing Super Admin role (id=2)
        const superAdminRole = await models.Role.findByPk(2);
        if (!superAdminRole) {
            throw new Error('Super Admin role not found');
        }

        // 2. Create all CRUD permissions for each module
        const permissions = [];
        for (const module of modules) {
            for (const action of ['create', 'read', 'update', 'delete']) {
                permissions.push({
                    name: `${action}_${module}`,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }
        }

        // Skip table structure modification and just insert data
        // Create only permissions that don't exist
        const existingPermissions = await models.Permission.findAll();
        const existingPermissionNames = existingPermissions.map(p => p.name);
        const newPermissions = permissions.filter(p => !existingPermissionNames.includes(p.name));
        
        if (newPermissions.length > 0) {
            await models.Permission.bulkCreate(newPermissions, { ignoreDuplicates: true });
        }

        // 3. Assign all permissions to admin role
        const allPermissions = await models.Permission.findAll();
        const rolePermissions = allPermissions.map(permission => ({
            role_id: superAdminRole.id,
            permission_id: permission.id
        }));

        await models.RolePermission.bulkCreate(rolePermissions, { ignoreDuplicates: true });
    },

    down: async (queryInterface, Sequelize) => {
        // Remove admin permissions
        await models.RolePermission.destroy({ where: {} });
        await models.Permission.destroy({ where: {} });
    }
};
