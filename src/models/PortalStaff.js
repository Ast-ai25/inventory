const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Role = require('./Role'); // Import Country model
const PortalStaff = sequelize.define('PortalStaff', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    mobile_number: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    role_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: 1 }
}, { timestamps: true });
PortalStaff.belongsTo(Role, { foreignKey: 'role_id', onDelete: 'CASCADE' });

module.exports = PortalStaff;