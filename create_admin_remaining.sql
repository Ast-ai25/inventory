-- Assuming company and role already created
SET @companyId = (SELECT id FROM companies WHERE name = 'Admin Company' LIMIT 1);
SET @roleId = (SELECT id FROM roles WHERE name = 'Super Admin' AND company_id = @companyId LIMIT 1);
SET @countryId = (SELECT country_id FROM companies WHERE id = @companyId LIMIT 1);

-- Create default branch if not exists
INSERT IGNORE INTO company_branches (company_id, country_id, state, city, address, contact_person, phone)
VALUES (@companyId, @countryId, 'Default State', 'Default City', 'Default Address', 'Admin', '0000000000');

-- Get branch ID
SET @branchId = (SELECT id FROM company_branches WHERE company_id = @companyId LIMIT 1);

-- Create Super Admin user if not exists
INSERT IGNORE INTO users (company_id, branch_id, name, email, password, role_id)
VALUES (
    @companyId,
    @branchId,
    'Super Admin',
    'admin@admin.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMy.MQRjQ3J1M8mYi5Es2j2tC9.4Z2sJ7K6', -- 12345678
    @roleId
);

-- Add basic permissions if needed
INSERT IGNORE INTO permissions (name) VALUES 
('user_management'), ('product_management'), ('inventory_management');

-- Assign all permissions to Super Admin role
INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT @roleId, id FROM permissions;
