const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Product = require('./Product');

const ProductSerial = sequelize.define('ProductSerial', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    serial_number: { type: DataTypes.STRING, unique: true, allowNull: false },
    qr_code: { type: DataTypes.TEXT },
    warranty_period: { type: DataTypes.INTEGER, allowNull: false },
    sale_date: { type: DataTypes.DATE, allowNull: true }
}, { timestamps: true });

ProductSerial.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = ProductSerial;
