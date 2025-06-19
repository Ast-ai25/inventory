const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Return = require('./Return');
const Product = require('./Product');
const Replacement = sequelize.define('Replacement', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    return_id: { type: DataTypes.INTEGER, allowNull: false },
    new_product_id: { type: DataTypes.INTEGER, allowNull: false },
    replacement_status: { type: DataTypes.ENUM('pending', 'completed'), defaultValue: 'pending' }
}, { timestamps: true });

Replacement.belongsTo(Return, { foreignKey: 'return_id' });
Replacement.belongsTo(Product, { foreignKey: 'new_product_id' });

module.exports = Replacement;
