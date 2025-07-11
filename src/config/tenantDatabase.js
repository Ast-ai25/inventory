const { Sequelize } = require('sequelize');
require('dotenv').config();

// Tenant database connection
const tenantSequelize = new Sequelize(
    process.env.TENANT_DB_NAME || 'tenant_db',
    process.env.TENANT_DB_USER || process.env.DB_USER,
    process.env.TENANT_DB_PASSWORD || process.env.DB_PASSWORD,
    {
        host: process.env.TENANT_DB_HOST || process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: true
        }
    }
);

// Check connection
tenantSequelize.authenticate()
    .then(() => console.log('✅ Tenant database connected successfully!'))
    .catch(err => console.error('❌ Tenant database connection failed:', err));

module.exports = tenantSequelize;
