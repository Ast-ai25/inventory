const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Sale = require('./Sale');

const Invoice = sequelize.define('Invoice', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    sale_id: { type: DataTypes.INTEGER, allowNull: false },
    total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, { timestamps: true });

Invoice.belongsTo(Sale, { foreignKey: 'sale_id' });

module.exports = Invoice;
