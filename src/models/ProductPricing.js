const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Product = require('./Product');
const Country = require('./Country');

const ProductPricing = sequelize.define('ProductPricing', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    country_id: { type: DataTypes.INTEGER, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: true },
    subcategory_id: { type: DataTypes.INTEGER, allowNull: true },
    brand_id: { type: DataTypes.INTEGER, allowNull: true },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    tax_percentage: { type: DataTypes.DECIMAL(5, 2), allowNull: false }
}, { timestamps: true });

// Define Relationships
ProductPricing.belongsTo(Product, { foreignKey: 'product_id' });
ProductPricing.belongsTo(Country, { foreignKey: 'country_id' });

module.exports = ProductPricing;
