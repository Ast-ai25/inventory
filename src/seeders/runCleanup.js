const { sequelize } = require('../models');
const fs = require('fs');
const path = require('path');

async function runCleanup() {
    const transaction = await sequelize.transaction();
    try {
        const sql = fs.readFileSync(
            path.join(__dirname, 'cleanup_permissions.sql'), 
            'utf8'
        );
        
        // Split SQL into individual statements
        const statements = sql.split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        // Execute each statement separately
        for (const statement of statements) {
            if (statement) {
                await sequelize.query(statement + ';', { transaction });
            }
        }

        await transaction.commit();
        console.log('Successfully cleaned up duplicate permissions');
    } catch (error) {
        await transaction.rollback();
        console.error('Error cleaning up permissions:', error);
    } finally {
        process.exit();
    }
}

runCleanup();
