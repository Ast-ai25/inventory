const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Country = require('./Country'); // Import Country model
const State = sequelize.define('State', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    country_id: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: true });
State.belongsTo(Country, { foreignKey: 'country_id', onDelete: 'CASCADE' });
module.exports = State;
