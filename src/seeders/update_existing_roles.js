const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

module.exports = {
  up: async () => {
    // Update existing roles with company_id from their users
    await sequelize.query(`
      UPDATE roles r
      JOIN users u ON r.id = u.role_id
      SET r.company_id = u.company_id
      WHERE r.company_id IS NULL
    `, { type: QueryTypes.RAW });

    // For super admin roles (no associated users), set company_id to NULL
    await sequelize.query(`
      UPDATE roles 
      SET company_id = NULL 
      WHERE id IN (
        SELECT id FROM roles 
        WHERE company_id IS NULL
        AND name IN ('Super Admin', 'Admin')
      )
    `, { type: QueryTypes.RAW });
  },

  down: async () => {
    // Revert changes if needed
    await sequelize.query(`
      UPDATE roles SET company_id = NULL
    `, { type: QueryTypes.RAW });
  }
};
