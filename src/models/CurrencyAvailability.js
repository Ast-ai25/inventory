const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const CurrencyAvailability = sequelize.define('CurrencyAvailability', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  currency_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'currencies',
      key: 'id'
    }
  },
  country_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'countries',
      key: 'id'
    }
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'CurrencyAvailability',
  tableName: 'currency_availabilities',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

CurrencyAvailability.associate = function (models) {
  CurrencyAvailability.belongsTo(models.Currency, {
    foreignKey: 'currency_id',
    as: 'Currency'
  });
  CurrencyAvailability.belongsTo(models.Country, {
    foreignKey: 'country_id',
    as: 'Country'
  });
};

module.exports = CurrencyAvailability;
