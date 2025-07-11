// Product model
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
    subcategory_id: { type: DataTypes.INTEGER, allowNull: true },
    brand_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: 1 }
}, { timestamps: true });

Product.associate = function (models) {
    Product.belongsTo(models.Category, { foreignKey: 'category_id', onDelete: 'CASCADE' });
    Product.belongsTo(models.Subcategory, { foreignKey: 'subcategory_id', onDelete: 'CASCADE' });
    Product.belongsTo(models.Brand, { foreignKey: 'brand_id', onDelete: 'CASCADE' });
    Product.belongsTo(models.Company, { foreignKey: 'company_id', onDelete: 'CASCADE' });
    Product.belongsToMany(models.MeasureUnit, {
        through: models.ProductMeasureUnit,
        foreignKey: 'product_id',
        otherKey: 'measure_unit_id'
    });
    Product.belongsToMany(models.PackageUnit, {
        through: models.ProductPackageUnit,
        foreignKey: 'product_id',
        otherKey: 'package_unit_id'
    });
};

module.exports = Product;
