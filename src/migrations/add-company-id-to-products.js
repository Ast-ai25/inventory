module.exports = {
  up: async (queryInterface, Sequelize) => {
    const columns = await queryInterface.describeTable('Products');
    if (!columns.company_id) {
      // First add column without constraint
      await queryInterface.addColumn('Products', 'company_id', {
        type: Sequelize.INTEGER,
        allowNull: true // Temporary allow null
      });

      // Set default company_id (1) for existing products
      await queryInterface.sequelize.query(
        `UPDATE Products SET company_id = 1 WHERE company_id IS NULL`
      );

      // Now add the not null constraint
      await queryInterface.changeColumn('Products', 'company_id', {
        type: Sequelize.INTEGER,
        allowNull: false
      });

      // Finally add the foreign key constraint
      await queryInterface.addConstraint('Products', {
        fields: ['company_id'],
        type: 'foreign key',
        name: 'Products_company_id_foreign_idx',
        references: {
          table: 'Companies',
          field: 'id'
        }
      });
    }
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Products', 'company_id');
  }
};
