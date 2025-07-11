const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Package = require('./Package');

const PackageUserLimit = sequelize.define('PackageUserLimit', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    package_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Package,
            key: 'id'
        }
    },
    max_users: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    tableName: 'package_user_limits',
    timestamps: true
});

module.exports = PackageUserLimit;
