const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Country = require('./Country'); // Import Country model
const State = require('./State'); // Import Country model
const City = sequelize.define("City", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: State,
            key: "id"
        },
        onDelete: "CASCADE"
    },
    country_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Country,
            key: "id"
        },
        onDelete: "CASCADE"
    },
    zip_code: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    county: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt"
});

// Define associations
State.hasMany(City, { foreignKey: "state_id", onDelete: "CASCADE" });
City.belongsTo(State, { foreignKey: "state_id" });

Country.hasMany(City, { foreignKey: "country_id", onDelete: "CASCADE" });
City.belongsTo(Country, { foreignKey: "country_id" });
module.exports = City;