const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Role = require('./Role');
const Permission = require('./Permission');

const RolePermission = sequelize.define('RolePermission', {
    role_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    permission_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true }
}, {
    timestamps: true,
    tableName: 'role_permissions'
});

RolePermission.belongsTo(Role, { foreignKey: 'role_id', onDelete: 'CASCADE' });
RolePermission.belongsTo(Permission, { foreignKey: 'permission_id', onDelete: 'CASCADE' });

module.exports = RolePermission;
