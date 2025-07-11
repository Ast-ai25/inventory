const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Category = require('./Category');

const Subcategory = sequelize.define('Subcategory', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: true });
Subcategory.belongsTo(Category, { foreignKey: 'category_id', onDelete: 'CASCADE' });

module.exports = Subcategory;
