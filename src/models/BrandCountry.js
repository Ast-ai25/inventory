const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Brand = require('./Brand');
const Country = require('./Country');

const BrandCountry = sequelize.define('BrandCountry', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    brand_id: { type: DataTypes.INTEGER, allowNull: false },
    country_id: { type: DataTypes.INTEGER, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// Define Relationships
BrandCountry.belongsTo(Brand, { foreignKey: 'brand_id' });
BrandCountry.belongsTo(Country, { foreignKey: 'country_id' });

module.exports = BrandCountry;
