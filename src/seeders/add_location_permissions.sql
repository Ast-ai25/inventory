-- Add new permissions for country/state/city modules
INSERT INTO permissions (name, created_at, updated_at) VALUES
('country_management', NOW(), NOW()),
('state_management', NOW(), NOW()),
('city_management', NOW(), NOW()),
('create_country', NOW(), NOW()),
('read_country', NOW(), NOW()),
('update_country', NOW(), NOW()),
('delete_country', NOW(), NOW()),
('create_state', NOW(), NOW()),
('read_state', NOW(), NOW()),
('update_state', NOW(), NOW()),
('delete_state', NOW(), NOW()),
('create_city', NOW(), NOW()),
('read_city', NOW(), NOW()),
('update_city', NOW(), NOW()),
('delete_city', NOW(), NOW());

-- Assign all new permissions to Super Admin (role_id=2)
INSERT INTO role_permissions (role_id, permission_id)
SELECT 2, id FROM permissions 
WHERE name IN (
  'country_management',
  'state_management',
  'city_management',
  'create_country',
  'read_country',
  'update_country',
  'delete_country',
  'create_state',
  'read_state',
  'update_state',
  'delete_state',
  'create_city',
  'read_city',
  'update_city',
  'delete_city'
);
