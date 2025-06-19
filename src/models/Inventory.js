// Inventory model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const Branch = require('./Branch');
const ProductSerial = require('./ProductSerial');

const Inventory = sequelize.define('Inventory', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    serial_id: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: true });

Inventory.belongsTo(Product, { foreignKey: 'product_id' });
Inventory.belongsTo(Branch, { foreignKey: 'branch_id' });
Inventory.belongsTo(ProductSerial, { foreignKey: 'serial_id' });

module.exports = Inventory;
