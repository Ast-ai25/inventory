const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./Role');
const RolePermission = sequelize.define('RolePermission', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    role_id: { type: DataTypes.INTEGER, allowNull: false },
    module: { type: DataTypes.STRING, allowNull: false },
    can_create: { type: DataTypes.BOOLEAN, defaultValue: false },
    can_read: { type: DataTypes.BOOLEAN, defaultValue: false },
    can_update: { type: DataTypes.BOOLEAN, defaultValue: false },
    can_delete: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { timestamps: true });
RolePermission.belongsTo(Role, { foreignKey: 'role_id', onDelete: 'CASCADE' });

module.exports = RolePermission;
