const { Sequelize } = require('sequelize');
const config = require('../src/config/database.js');
const fs = require('fs');
const path = require('path');

async function initTenantDatabase() {
  // Create connection to tenant_database
  require('dotenv').config();
  const tenantSequelize = new Sequelize({
    database: 'tenant_database',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log
  });

  try {
    // Read and execute schema file
    const schema = fs.readFileSync(
      path.join(__dirname, '../db_schema.sql'), 
      'utf8'
    );
    
    await tenantSequelize.query(schema);
    console.log('Tenant database schema initialized successfully');

    // Run all migrations
    const migrations = fs.readdirSync(
      path.join(__dirname, '../src/migrations'))
      .filter(file => file.endsWith('.js'));
    
    for (const migration of migrations) {
      const migrationFile = require(`../src/migrations/${migration}`);
      await migrationFile.up(tenantSequelize.getQueryInterface(), Sequelize);
      console.log(`Ran migration: ${migration}`);
    }

  } catch (error) {
    console.error('Error initializing tenant database:', error);
    process.exit(1);
  }
}

initTenantDatabase();
