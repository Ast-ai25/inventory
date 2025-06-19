const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CompanyBranch = require('./CompanyBranch');

const Expense = sequelize.define('Expense', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    expense_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

// Define Relationship
Expense.belongsTo(CompanyBranch, { foreignKey: 'branch_id' });

module.exports = Expense;
