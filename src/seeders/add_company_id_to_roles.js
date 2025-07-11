const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

module.exports = {
  up: async () => {
    await sequelize.query(`
      ALTER TABLE roles 
      ADD COLUMN company_id INTEGER,
      ADD CONSTRAINT fk_roles_company 
        FOREIGN KEY (company_id) 
        REFERENCES companies(id)
        ON DELETE SET NULL;
    `, { type: QueryTypes.RAW });
  },

  down: async () => {
    await sequelize.query(`
      ALTER TABLE roles
      DROP CONSTRAINT fk_roles_company,
      DROP COLUMN company_id;
    `, { type: QueryTypes.RAW });
  }
};
