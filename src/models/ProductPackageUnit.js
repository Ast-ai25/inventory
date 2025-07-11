const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ProductPackageUnit = sequelize.define('ProductPackageUnit', {}, {
    tableName: 'product_package_units',
    timestamps: false
});

module.exports = ProductPackageUnit;
