const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Module = require('./Module');
console.log(sequelize)
const Permission = sequelize.define('Permission', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    module_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Module,
            key: 'id'
        }
    }
}, {
    tableName: 'permissions',
    timestamps: false
});

Permission.belongsTo(Module, { foreignKey: 'module_id' });
Module.hasMany(Permission, { foreignKey: 'module_id' });

module.exports = Permission;
