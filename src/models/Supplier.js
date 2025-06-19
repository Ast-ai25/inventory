// Supplier model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Country = require('./Country');
const State = require('./State');
const City = require('./City');

const Supplier = sequelize.define('Supplier', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    country_id: { type: DataTypes.INTEGER, allowNull: false },
    state_id: { type: DataTypes.INTEGER, allowNull: true },
    city_id: { type: DataTypes.INTEGER, allowNull: true },
    contact_person: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: 1 }
}, { timestamps: true });

Supplier.belongsTo(Country, { foreignKey: 'country_id' });
Supplier.belongsTo(State, { foreignKey: 'state_id' });
Supplier.belongsTo(City, { foreignKey: 'city_id' });

module.exports = Supplier;

