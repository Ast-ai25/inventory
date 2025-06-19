const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const PortalUser = require('./PortalUser'); // Import Country model

const Company = sequelize.define('Company', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    logo: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: false },
    hq_address: { type: DataTypes.TEXT, allowNull: false },
    telephone: { type: DataTypes.STRING },
    contact1_name: { type: DataTypes.STRING },
    contact1_mobile: { type: DataTypes.STRING },
    contact1_email: { type: DataTypes.STRING },
    contact2_name: { type: DataTypes.STRING },
    contact2_mobile: { type: DataTypes.STRING },
    contact2_email: { type: DataTypes.STRING },
    gstin: { type: DataTypes.STRING(50) },
    website: { type: DataTypes.STRING },
    letterhead_design: { type: DataTypes.TEXT },
    signature: { type: DataTypes.TEXT }
}, { timestamps: true });
Company.belongsTo(PortalUser, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = Company;
