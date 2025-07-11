const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MeasureUnit = sequelize.define('MeasureUnit', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { timestamps: true });

module.exports = MeasureUnit;
