const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Company = sequelize.define('Company', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    company_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    logo: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    hq_address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    telephone: {
        type: DataTypes.STRING
    },
    contact1_name: {
        type: DataTypes.STRING
    },
    contact1_mobile: {
        type: DataTypes.STRING
    },
    contact1_email: {
        type: DataTypes.STRING
    },
    contact2_name: {
        type: DataTypes.STRING
    },
    contact2_mobile: {
        type: DataTypes.STRING
    },
    contact2_email: {
        type: DataTypes.STRING
    },
    gstin: {
        type: DataTypes.STRING(50)
    },
    website: {
        type: DataTypes.STRING
    },
    letterhead_design: {
        type: DataTypes.TEXT
    },
    signature: {
        type: DataTypes.TEXT
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true
});

Company.associate = function (models) {
    Company.belongsTo(models.PortalUser, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
    });
    Company.belongsTo(models.CompanyType, {
        foreignKey: 'company_type_id',
        as: 'CompanyType'
    });
    Company.belongsToMany(models.Brand, {
        through: 'CompanyBrands',
        as: 'Brands'
    });
    Company.hasOne(models.TenantRegistry, {
        foreignKey: 'company_id',
        as: 'TenantRegistry'
    });
};

module.exports = Company;
