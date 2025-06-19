DELIMITER //

CREATE PROCEDURE setup_super_admin()
BEGIN
    DECLARE companyId INT;
    DECLARE roleId INT;
    DECLARE branchId INT;
    DECLARE countryId INT;
    DECLARE adminExists INT;

    -- 1. Check company exists
    SELECT id INTO companyId FROM companies WHERE name = 'Admin Company' LIMIT 1;
    IF companyId IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Company not found - run initial setup first';
    END IF;

    -- 2. Super Admin role
    SELECT id INTO roleId FROM roles WHERE name = 'Super Admin' AND company_id = companyId LIMIT 1;
    IF roleId IS NULL THEN
        INSERT INTO roles (name, company_id, description)
        VALUES ('Super Admin', companyId, 'System super administrator with full access');
        SET roleId = LAST_INSERT_ID();
    END IF;

    -- 3. Branch
    SELECT country_id INTO countryId FROM companies WHERE id = companyId LIMIT 1;
    SELECT id INTO branchId FROM company_branches WHERE company_id = companyId LIMIT 1;
    IF branchId IS NULL THEN
        INSERT INTO company_branches (company_id, country_id, state, city, address, contact_person, phone)
        VALUES (companyId, countryId, 'Default State', 'Default City', 'Default Address', 'Admin', '0000000000');
        SET branchId = LAST_INSERT_ID();
    END IF;

    -- 4. Admin user
    SELECT COUNT(*) INTO adminExists FROM users WHERE email = 'admin@admin.com';
    IF adminExists = 0 THEN
        INSERT INTO users (company_id, branch_id, name, email, password, role_id)
        VALUES (companyId, branchId, 'Super Admin', 'admin@admin.com',
        '$2a$10$N9qo8uLOickgx2ZMRZoMy.MQRjQ3J1M8mYi5Es2j2tC9.4Z2sJ7K6', roleId);
    END IF;

    -- 5. Permissions
    INSERT IGNORE INTO permissions (name)
    VALUES ('user_management'), ('product_management'), ('inventory_management');

    -- 6. Role-permission mapping
    INSERT IGNORE INTO role_permissions (role_id, permission_id)
    SELECT roleId, id FROM permissions 
    WHERE NOT EXISTS (
        SELECT 1 FROM role_permissions 
        WHERE role_id = roleId AND permission_id = permissions.id
    );

    -- Final check
    SELECT 
        (SELECT COUNT(*) FROM users WHERE email = 'admin@admin.com') AS admin_user_exists,
        (SELECT COUNT(*) FROM role_permissions WHERE role_id = roleId) AS permissions_assigned;

END //

DELIMITER ;

-- Then run:
CALL setup_super_admin();
