const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Sale = require('./Sale');

const Return = sequelize.define('Return', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    sale_id: { type: DataTypes.INTEGER, allowNull: false },
    return_reason: { type: DataTypes.STRING, allowNull: false },
    return_status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected', 'processed'),
        defaultValue: 'pending'
    },
    refund_amount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    return_date: { type: DataTypes.DATE, allowNull: true },
    approved_by: { type: DataTypes.INTEGER, allowNull: true },
    processed_by: { type: DataTypes.INTEGER, allowNull: true }
}, { timestamps: true });

Return.belongsTo(Sale, { foreignKey: 'sale_id' });

module.exports = Return;
