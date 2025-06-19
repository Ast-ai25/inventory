const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Country = require('./Country'); // Import Country model
const Category = require('./Category');

const Brand = sequelize.define('Brand', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
    country_id: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: true });
Brand.belongsTo(Category, { foreignKey: 'category_id', onDelete: 'CASCADE' });
Brand.belongsTo(Country, { foreignKey: 'country_id', onDelete: 'CASCADE' });

module.exports = Brand;
