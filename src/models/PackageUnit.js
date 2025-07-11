const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PackageUnit = sequelize.define('PackageUnit', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.STRING },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { timestamps: true });

module.exports = PackageUnit;
