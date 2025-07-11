-- Add permissions for language availabilities
INSERT INTO permissions (name, description, created_at, updated_at)
VALUES 
('create_language_availability', 'Create language availability assignments', NOW(), NOW()),
('read_language_availability', 'View language availability assignments', NOW(), NOW()),
('update_language_availability', 'Update language availability assignments', NOW(), NOW()),
('delete_language_availability', 'Delete language availability assignments', NOW(), NOW());

-- Assign permissions to Super Admin role
INSERT INTO role_permissions (role_id, permission_id, created_at, updated_at)
SELECT r.id, p.id, NOW(), NOW()
FROM roles r
JOIN permissions p ON p.name IN (
    'create_language_availability',
    'read_language_availability',
    'update_language_availability',
    'delete_language_availability'
)
WHERE r.name = 'Super Admin';
