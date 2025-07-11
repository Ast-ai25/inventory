const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Country = require('./Country');

const Delivery = sequelize.define('Delivery', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    country_id: { type: DataTypes.INTEGER, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
    timestamps: true
});

Delivery.belongsTo(Country, { foreignKey: 'country_id', as: 'Country' });

module.exports = Delivery;
