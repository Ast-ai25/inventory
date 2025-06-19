// Sales model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const Branch = require('./Branch');

const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    customer_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    tax_amount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    discount_amount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    payment_status: {
        type: DataTypes.ENUM('pending', 'paid', 'partially_paid', 'cancelled'),
        defaultValue: 'pending'
    },
    sale_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    due_date: { type: DataTypes.DATE, allowNull: true }
}, { timestamps: true });

// Define Relationships
Sale.belongsTo(User, { foreignKey: 'customer_id' });
Sale.belongsTo(Product, { foreignKey: 'product_id' });
Sale.belongsTo(Branch, { foreignKey: 'branch_id' });

module.exports = Sale;
