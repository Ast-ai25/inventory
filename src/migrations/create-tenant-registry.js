module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableExists = await queryInterface.showAllTables()
      .then(tables => tables.includes('tenant_registry'));

    if (!tableExists) {
      await queryInterface.createTable('tenant_registry', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        company_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Companies',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        db_name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        db_host: {
          type: Sequelize.STRING,
          allowNull: false
        },
        db_user: {
          type: Sequelize.STRING,
          allowNull: false
        },
        db_password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        package_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Packages',
            key: 'id'
          }
        },
        expiry_date: {
          type: Sequelize.DATE,
          allowNull: false
        },
        is_active: {
          type: Sequelize.BOOLEAN,
          defaultValue: true
        },
        needs_setup: {
          type: Sequelize.BOOLEAN,
          defaultValue: true
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        }
      });

      // Check if indexes exist before creating
      const indexes = await queryInterface.showIndex('tenant_registry');
      const hasCompanyIndex = indexes.some(i => i.name === 'tenant_registry_company_id');
      const hasPackageIndex = indexes.some(i => i.name === 'tenant_registry_package_id');

      if (!hasCompanyIndex) {
        await queryInterface.addIndex('tenant_registry', ['company_id'], {
          name: 'tenant_registry_company_id'
        });
      }
      if (!hasPackageIndex) {
        await queryInterface.addIndex('tenant_registry', ['package_id'], {
          name: 'tenant_registry_package_id'
        });
      }
    }
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('tenant_registry');
  }
};
