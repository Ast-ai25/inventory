const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tax = sequelize.define('Tax', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    country_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    percentage: { type: DataTypes.FLOAT, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true } // Active/Blocked status
});
// Define Relationship
Tax.belongsTo(Country, { foreignKey: 'country_id' });
module.exports = Tax;
