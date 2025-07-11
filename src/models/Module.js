const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
console.log(sequelize)
const Module = sequelize.define('Module', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: true
});

module.exports = Module;
