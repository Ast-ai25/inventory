const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Company = require('./Company');

const CompanyUserType = sequelize.define('CompanyUserType', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
    tableName: 'company_user_types',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

CompanyUserType.belongsTo(Company, {
    foreignKey: 'company_id',
    as: 'Company'
});

module.exports = CompanyUserType;
