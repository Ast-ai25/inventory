const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ProductMeasureUnit = sequelize.define('ProductMeasureUnit', {}, {
    tableName: 'product_measure_units',
    timestamps: false
});

module.exports = ProductMeasureUnit;
