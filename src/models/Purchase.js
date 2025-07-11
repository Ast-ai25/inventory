const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Supplier = require('./Supplier');
const Product = require('./Product');
const ProductSerial = require('./ProductSerial');
const Purchase = sequelize.define('Purchase', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    supplier_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    serial_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    purchase_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    purchase_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: true });

Purchase.belongsTo(Supplier, { foreignKey: 'supplier_id' });
Purchase.belongsTo(Product, { foreignKey: 'product_id' });
Purchase.belongsTo(ProductSerial, { foreignKey: 'serial_id' });

module.exports = Purchase;
