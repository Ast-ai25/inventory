const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Role = sequelize.define('Role', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    company_id: { type: DataTypes.INTEGER, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true }
}, {
    tableName: 'roles',
    timestamps: true,
    paranoid: false,
    indexes: [
        {
            unique: true,
            fields: ['name', 'company_id']
        }
    ]
});

Role.associate = function (models) {
    Role.belongsTo(models.Company, {
        foreignKey: 'company_id',
        as: 'Company'
    });
    Role.hasMany(models.User, {
        foreignKey: 'role_id',
        as: 'Users'
    });
    // ✅ Add this: so middleware can access Role.RolePermissions[]
    Role.hasMany(models.RolePermission, {
        foreignKey: 'role_id',
        as: 'RolePermissions'
    });

    Role.belongsToMany(models.Permission, {
        through: 'role_permissions',
        foreignKey: 'role_id',
        otherKey: 'permission_id',
        as: 'Permissions'
    });
};

// Instance method to get permissions
Role.prototype.getPermissions = async function () {
    return this.getPermissions({
        joinTableAttributes: []
    });
};

module.exports = Role;
