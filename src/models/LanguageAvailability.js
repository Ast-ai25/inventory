const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Country = require('./Country'); // Import Country model
const State = require('./State'); // Import Country model
const Language = require('./Language'); // Import Country model

const LanguageAvailability = sequelize.define('LanguageAvailability', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    language_id: { type: DataTypes.INTEGER, allowNull: false },
    country_id: { type: DataTypes.INTEGER, allowNull: true },
    state_id: { type: DataTypes.INTEGER, allowNull: true }
}, { timestamps: true });
LanguageAvailability.belongsTo(Language, { foreignKey: 'language_id', onDelete: 'CASCADE' });
LanguageAvailability.belongsTo(Country, { foreignKey: 'country_id', onDelete: 'CASCADE' });
LanguageAvailability.belongsTo(State, { foreignKey: 'state_id', onDelete: 'CASCADE' });

module.exports = LanguageAvailability;