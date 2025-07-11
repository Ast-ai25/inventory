const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

module.exports = {
  up: async () => {
    await sequelize.query(`
      ALTER TABLE users 
      ADD COLUMN tenant_admin BOOLEAN DEFAULT false,
      ADD COLUMN subscription_expiry_date DATE,
      ADD COLUMN preferred_language VARCHAR(10),
      ADD COLUMN timezone VARCHAR(50);
      
      ALTER TABLE companies
      ADD COLUMN default_country_id INTEGER,
      ADD COLUMN default_language_id INTEGER,
      ADD COLUMN default_currency_id INTEGER,
      ADD COLUMN tenant_id VARCHAR(36) NOT NULL DEFAULT uuid_generate_v4();
      
      CREATE TABLE tenant_subscriptions (
        id SERIAL PRIMARY KEY,
        tenant_id VARCHAR(36) NOT NULL,
        package_id INTEGER NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        status VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `, { type: QueryTypes.RAW });
  },

  down: async () => {
    await sequelize.query(`
      ALTER TABLE users 
      DROP COLUMN tenant_admin,
      DROP COLUMN subscription_expiry_date,
      DROP COLUMN preferred_language,
      DROP COLUMN timezone;
      
      ALTER TABLE companies
      DROP COLUMN default_country_id,
      DROP COLUMN default_language_id, 
      DROP COLUMN default_currency_id,
      DROP COLUMN tenant_id;
      
      DROP TABLE tenant_subscriptions;
    `, { type: QueryTypes.RAW });
  }
};
