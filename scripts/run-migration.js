const { sequelize } = require('../src/config/database');
const path = require('path');
const fs = require('fs');

async function runMigration() {
  try {
    await sequelize.authenticate();
    console.log('Connection established successfully');
    
    // Get all migration files
    const migrationFiles = fs.readdirSync(path.join(__dirname, '../src/migrations'))
      .filter(file => file.endsWith('.js') && file !== 'index.js');

    // Run each migration
    for (const file of migrationFiles) {
      console.log(`Running migration: ${file}`);
      const migration = require(path.join(__dirname, '../src/migrations', file));
      const queryInterface = sequelize.getQueryInterface();
      await migration.up(queryInterface, sequelize.Sequelize);
    }
    
    console.log('All migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
