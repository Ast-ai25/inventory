const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Country = sequelize.define('Country', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    country_code: { type: DataTypes.STRING(10), allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: 1 }
}, { timestamps: true });

module.exports = Country;
