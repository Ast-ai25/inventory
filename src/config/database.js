const { Sequelize } = require('sequelize');
require('dotenv').config();

// Main database connection
const mainSequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: true
        }
    }
);

// Connection manager for tenant databases
const tenantConnections = new Map();

const getTenantConnection = async (tenantId) => {
    if (!tenantConnections.has(tenantId)) {
        const TenantRegistry = require('../models/TenantRegistry');
        const tenant = await TenantRegistry.findOne({ where: { id: tenantId } });
        
        if (!tenant) {
            throw new Error('Tenant not found');
        }

        const connection = new Sequelize(
            tenant.db_name,
            tenant.db_user,
            tenant.db_password,
            {
                host: tenant.db_host,
                dialect: 'mysql',
                logging: false,
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                },
                define: {
                    timestamps: true
                }
            }
        );

        // Initialize and sync models for tenant database
        try {
            await connection.authenticate();
            console.log(`✅ Tenant database ${tenant.db_name} connected successfully!`);
            
            // Import and initialize all models
            const models = require('../models');
            models.init(connection);
            
            // Sync all models
            await connection.sync();
            console.log(`✅ Tenant database ${tenant.db_name} models synced successfully!`);
        } catch (err) {
            console.error(`❌ Tenant database ${tenant.db_name} sync failed:`, err);
            throw err;
        }

        tenantConnections.set(tenantId, connection);
    }

    return tenantConnections.get(tenantId);
};

// Check main connection
mainSequelize.authenticate()
    .then(() => console.log('✅ Main database connected successfully!'))
    .catch(err => console.error('❌ Main database connection failed:', err));

module.exports = {
    sequelize: mainSequelize,
    getTenantConnection
};
