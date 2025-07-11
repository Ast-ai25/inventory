'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const columns = await queryInterface.describeTable('Users');
    
    if (!columns.use_default_db) {
      await queryInterface.addColumn('Users', 'use_default_db', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      });
    }

    if (!columns.db_name) {
      await queryInterface.addColumn('Users', 'db_name', {
        type: Sequelize.STRING,
        allowNull: true
      });
    }

    if (!columns.db_user) {
      await queryInterface.addColumn('Users', 'db_user', {
        type: Sequelize.STRING,
        allowNull: true
      });
    }

    if (!columns.db_password) {
      await queryInterface.addColumn('Users', 'db_password', {
        type: Sequelize.STRING,
        allowNull: true
      });
    }

    if (!columns.db_host) {
      await queryInterface.addColumn('Users', 'db_host', {
        type: Sequelize.STRING,
        allowNull: true
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'use_default_db');
    await queryInterface.removeColumn('Users', 'db_name');
    await queryInterface.removeColumn('Users', 'db_user');
    await queryInterface.removeColumn('Users', 'db_password');
    await queryInterface.removeColumn('Users', 'db_host');
  }
};
