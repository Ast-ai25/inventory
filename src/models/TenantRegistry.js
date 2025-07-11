const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TenantRegistry = sequelize.define('TenantRegistry', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Companies',
            key: 'id'
        }
    },
    db_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    db_host: {
        type: DataTypes.STRING,
        allowNull: false
    },
    db_user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    db_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    package_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Packages',
            key: 'id'
        }
    },
    expiry_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'tenant_registry',
    timestamps: false
});

module.exports = TenantRegistry;
