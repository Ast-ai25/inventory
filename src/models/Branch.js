const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Company = require('./Company'); // Import Country model
const Country = require('./Country'); // Import Country model
const State = require('./State'); // Import Country model
const City = require('./City'); // Import Country model

const Branch = sequelize.define('Branch', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    company_id: { type: DataTypes.INTEGER, allowNull: false },
    country_id: { type: DataTypes.INTEGER, allowNull: false },
    state_id: { type: DataTypes.INTEGER, allowNull: false },
    city_id: { type: DataTypes.INTEGER, allowNull: false },
    part_of_city: { type: DataTypes.STRING },
    address: { type: DataTypes.TEXT },
    contact_person: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: 1 }
}, { timestamps: true });

Branch.belongsTo(Company, { foreignKey: 'company_id', onDelete: 'CASCADE' });
Branch.belongsTo(Country, { foreignKey: 'country_id', onDelete: 'CASCADE' });
Branch.belongsTo(State, { foreignKey: 'state_id', onDelete: 'CASCADE' });
Branch.belongsTo(City, { foreignKey: 'city_id', onDelete: 'CASCADE' });

module.exports = Branch;