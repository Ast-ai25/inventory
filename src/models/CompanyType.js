const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const CompanyType = sequelize.define('CompanyType', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
    tableName: 'company_types',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

module.exports = CompanyType;
