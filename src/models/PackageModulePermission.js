const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Package = require('./Package');
const Module = require('./Module');
const Permission = require('./Permission');

const PackageModulePermission = sequelize.define('PackageModulePermission', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    package_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Package,
            key: 'id'
        }
    },
    module_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Module,
            key: 'id'
        }
    },
    permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Permission,
            key: 'id'
        }
    },
    is_enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'package_module_permissions',
    timestamps: true
});

PackageModulePermission.belongsTo(Package, { foreignKey: 'package_id', as: 'Package' });
PackageModulePermission.belongsTo(Module, { foreignKey: 'module_id', as: 'Module' });
PackageModulePermission.belongsTo(Permission, { foreignKey: 'permission_id', as: 'Permission' });

module.exports = PackageModulePermission;
