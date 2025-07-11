const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Company = require('./Company');

const CompanyBranch = sequelize.define('CompanyBranch', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    company_id: { type: DataTypes.INTEGER, allowNull: false },
    country_id: { type: DataTypes.INTEGER, allowNull: false },
    state: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    address: { type: DataTypes.TEXT },
    contact_person: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true } // Active/Blocked status
});

// Define Relationship
CompanyBranch.belongsTo(Company, { foreignKey: 'company_id' });

module.exports = CompanyBranch;
