const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./Role');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    company_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role_id: { type: DataTypes.INTEGER, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// Define Relationships
User.belongsTo(Role, { foreignKey: 'role_id', as: 'Role' });

module.exports = User;
