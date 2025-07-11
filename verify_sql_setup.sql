-- Verify SQL Setup
SELECT 'Companies' AS table_name, COUNT(*) AS count FROM companies
UNION ALL
SELECT 'Roles' AS table_name, COUNT(*) AS count FROM roles
UNION ALL
SELECT 'Users' AS table_name, COUNT(*) AS count FROM users
UNION ALL
SELECT 'Permissions' AS table_name, COUNT(*) AS count FROM permissions
UNION ALL
SELECT 'Role Permissions' AS table_name, COUNT(*) AS count FROM role_permissions;

-- Check admin user exists
SELECT * FROM users WHERE email = 'admin@admin.com';

-- Check Super Admin role exists
SELECT * FROM roles WHERE name = 'Super Admin';

-- Check permissions assigned
SELECT r.name AS role_name, p.name AS permission_name
FROM role_permissions rp
JOIN roles r ON rp.role_id = r.id
JOIN permissions p ON rp.permission_id = p.id
WHERE r.name = 'Super Admin';
