const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Supplier = require('./Supplier');
const Product = require('./Product');
const Country = require('./Country');
const Currency = require('./Currency');

const ProductSupplierPrice = sequelize.define('ProductSupplierPrice', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    supplier_id: { type: DataTypes.INTEGER, allowNull: false },
    country_id: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    currency_id: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: true });

ProductSupplierPrice.belongsTo(Product, { foreignKey: 'product_id' });
ProductSupplierPrice.belongsTo(Supplier, { foreignKey: 'supplier_id' });
ProductSupplierPrice.belongsTo(Country, { foreignKey: 'country_id' });
ProductSupplierPrice.belongsTo(Currency, { foreignKey: 'currency_id' });
module.exports = ProductSupplierPrice;
