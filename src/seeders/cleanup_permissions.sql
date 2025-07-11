-- First create a temporary table with distinct permissions
CREATE TEMPORARY TABLE temp_permissions AS
SELECT MIN(id) as id, name 
FROM permissions 
GROUP BY name;

-- First remove role_permissions references to duplicates
DELETE rp FROM role_permissions rp
LEFT JOIN temp_permissions tp ON rp.permission_id = tp.id
WHERE tp.id IS NULL;

-- Then delete the duplicate permissions
DELETE p FROM permissions p
LEFT JOIN temp_permissions tp ON p.id = tp.id
WHERE tp.id IS NULL;

-- Drop the temporary table
DROP TEMPORARY TABLE temp_permissions;
