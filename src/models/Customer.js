const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const City = require('./City');

const Customer = sequelize.define('Customer', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    mobile_number: { type: DataTypes.STRING, allowNull: false, unique: true },
    address: { type: DataTypes.TEXT, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    city_id: { type: DataTypes.INTEGER, allowNull: false },
    pincode: { type: DataTypes.STRING(10) },
    landline_number: { type: DataTypes.STRING },
    contact_person: { type: DataTypes.STRING },
    gstin: { type: DataTypes.STRING(50) },
    active: { type: DataTypes.BOOLEAN, defaultValue: 1 }
}, { timestamps: true });
Customer.belongsTo(City, { foreignKey: 'city_id', onDelete: 'CASCADE' });

module.exports = Customer;