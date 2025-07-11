const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Currency = sequelize.define('Currency', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    code: { type: DataTypes.STRING(10), allowNull: false },
    name: { type: DataTypes.STRING(50), allowNull: false },
    symbol: { type: DataTypes.STRING(10), allowNull: false }
}, { timestamps: true });

module.exports = Currency;
