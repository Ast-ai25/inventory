const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Sale = require('./Sale');
const Product = require('./Product');
const ProductSerial = require('./ProductSerial');
const ProductSupplierPrice = require('./ProductSupplierPrice');

const SaleItem = sequelize.define('SaleItem', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    sale_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    serial_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    product_supplier_price_id: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, { timestamps: true });
SaleItem.belongsTo(Sale, { foreignKey: 'sale_id' });
SaleItem.belongsTo(Product, { foreignKey: 'product_id' });
SaleItem.belongsTo(ProductSerial, { foreignKey: 'serial_id' });
SaleItem.belongsTo(ProductSupplierPrice, { foreignKey: 'product_supplier_price_id' });
module.exports = SaleItem;