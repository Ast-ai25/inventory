const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Country = require('./Country'); // Import Country model

const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    country_id: { type: DataTypes.INTEGER, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: 1 }
}, { timestamps: true });
Category.belongsTo(Country, { foreignKey: 'country_id', onDelete: 'CASCADE' });

module.exports = Category;
