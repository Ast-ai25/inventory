const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    company_id: { type: DataTypes.INTEGER, allowNull: true },
    branch_id: { type: DataTypes.INTEGER, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role_id: { type: DataTypes.INTEGER, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    country_id: { type: DataTypes.INTEGER, allowNull: true },
    department_id: { type: DataTypes.INTEGER, allowNull: true },
    company_user_type_id: { type: DataTypes.INTEGER, allowNull: true },
    package_id: { type: DataTypes.INTEGER, allowNull: true },
    use_default_db: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true,
        allowNull: false 
    },
    db_name: { type: DataTypes.STRING, allowNull: true },
    db_user: { type: DataTypes.STRING, allowNull: true },
    db_password: { type: DataTypes.STRING, allowNull: true },
    db_host: { type: DataTypes.STRING, allowNull: true }
}, {
    timestamps: false
});

User.associate = function (models) {
    User.belongsTo(models.Role, { foreignKey: 'role_id', as: 'Role' });
    User.belongsTo(models.Country, { foreignKey: 'country_id', as: 'Country' });
    User.belongsTo(models.Company, { foreignKey: 'company_id', as: 'Company' });
    User.belongsTo(models.CompanyDepartment, {
        foreignKey: 'department_id',
        as: 'Department'
    });
    User.belongsTo(models.CompanyUserType, {
        foreignKey: 'company_user_type_id',
        as: 'CompanyUserType'
    });
    User.belongsTo(models.Package, {
        foreignKey: 'package_id',
        as: 'Package'
    });
    User.belongsTo(models.CompanyBranch, { foreignKey: 'branch_id', as: 'Branch' });
};

module.exports = User;
