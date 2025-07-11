const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Country = require('./Country');

const Package = sequelize.define('Package', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    country_id: { type: DataTypes.INTEGER, allowNull: false },
    periods: { type: DataTypes.INTEGER, allowNull: false }, // in days
    remarks: { type: DataTypes.TEXT },
    terms: { type: DataTypes.TEXT },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
    timestamps: true
});

Package.belongsTo(Country, { foreignKey: 'country_id', as: 'Country' });

module.exports = Package;
