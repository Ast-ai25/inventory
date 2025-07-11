const { getTenantConnection } = require('../config/database');
const TenantRegistry = require('../models/TenantRegistry');
// Define global roles that should NOT require tenant context
const GLOBAL_ROLES = ['Super Admin', 'Admin', 'Staff']; // Add or adjust as your system needs
module.exports = async (req, res, next) => {
    try {
        // Skip for global routes (auth, registration, etc.)
        if (req.path.startsWith('/auth') || req.path.startsWith('/register')) {
            return next();
        }

        // Get tenant ID from authenticated user or request params
        const tenantId = req.user?.tenant_id || req.headers['x-tenant-id'];
        const userRole = req.user?.Role?.name || req.user?.role || req.user?.role_name;
        console.log('Checking user role:', userRole);
        // Skip tenant check for super admin users


        if (!tenantId) {
            console.log(`${userRole} detected - skipping tenant check`);
            req.tenantDb = require('../config/database').sequelize; // Main/global DB connection
            return next();
        }

        // For regular users, require tenant ID
        if (!tenantId) {
            return res.status(400).json({ message: 'Tenant identification missing' });
        }

        // Verify tenant exists and is active
        const tenant = await TenantRegistry.findOne({
            where: {
                id: tenantId,
                is_active: true
            }
        });

        if (!tenant) {
            return res.status(403).json({ message: 'Invalid or inactive tenant' });
        }

        // Get database connection - use custom if specified, otherwise default
        if (tenant.db_name && tenant.db_host) {
            req.tenantDb = await getTenantConnection(tenantId);
        } else {
            // Use default tenant database
            req.tenantDb = require('../config/tenantDatabase');
        }
        req.tenant = tenant;

        next();
    } catch (error) {
        console.error('Tenant connection error:', error);
        res.status(500).json({ message: 'Tenant database connection failed' });
    }
};
