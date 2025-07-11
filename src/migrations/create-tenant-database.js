module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create tenant_database if not exists
    await queryInterface.sequelize.query(
      `CREATE DATABASE IF NOT EXISTS tenant_database`
    );
    
    // Grant privileges (using same user as main DB)
    const config = require('../config/database.js');
    await queryInterface.sequelize.query(
      `GRANT ALL PRIVILEGES ON tenant_database.* TO ?@'%'`,
      { replacements: [config.username] }
    );
    
    await queryInterface.sequelize.query(`FLUSH PRIVILEGES`);

    // Update tenant registry to use tenant_database as default
    await queryInterface.sequelize.query(`
      UPDATE tenant_registry 
      SET db_name = 'tenant_database'
      WHERE db_name = 'inventory_billing_rma'
    `);
  },

  down: async (queryInterface) => {
    // Revert to original state if needed
    await queryInterface.sequelize.query(`
      UPDATE tenant_registry 
      SET db_name = 'inventory_billing_rma'
      WHERE db_name = 'tenant_database'
    `);
  }
};
