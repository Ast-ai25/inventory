// Payments model
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Invoice = require('./Invoice');

const Payment = sequelize.define('Payment', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    invoice_id: { type: DataTypes.INTEGER, allowNull: false },
    payment_type: { type: DataTypes.ENUM('credit', 'debit'), allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    payment_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: true });

Payment.belongsTo(Invoice, { foreignKey: 'invoice_id' });

module.exports = Payment;
