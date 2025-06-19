// Product model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');
const Subcategory = require('./Subcategory');
const Brand = require('./Brand');

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
    subcategory_id: { type: DataTypes.INTEGER, allowNull: true },
    brand_id: { type: DataTypes.INTEGER, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: 1 }
}, { timestamps: true });
Product.belongsTo(Category, { foreignKey: 'category_id', onDelete: 'CASCADE' });
Product.belongsTo(Subcategory, { foreignKey: 'subcategory_id', onDelete: 'CASCADE' });
Product.belongsTo(Brand, { foreignKey: 'brand_id', onDelete: 'CASCADE' });

module.exports = Product;

