const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

module.exports = {
  up: async () => {
    // Remove existing unique constraint on name
    await sequelize.query(`
      ALTER TABLE roles 
      DROP INDEX name
    `, { type: QueryTypes.RAW });

    // Add new composite unique constraint (name + company_id)
    await sequelize.query(`
      ALTER TABLE roles 
      ADD CONSTRAINT uq_role_name_company 
      UNIQUE (name, company_id)
    `, { type: QueryTypes.RAW });
  },

  down: async () => {
    // Revert changes
    await sequelize.query(`
      ALTER TABLE roles 
      DROP CONSTRAINT uq_role_name_company
    `, { type: QueryTypes.RAW });

    await sequelize.query(`
      ALTER TABLE roles 
      ADD UNIQUE INDEX name (name)
    `, { type: QueryTypes.RAW });
  }
};
