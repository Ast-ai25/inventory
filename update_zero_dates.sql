-- Update NULL dates in Roles table (safe approach)
UPDATE Roles SET 
    createdAt = COALESCE(createdAt, '2020-01-01 00:00:00'),
    updatedAt = COALESCE(updatedAt, '2020-01-01 00:00:00')
WHERE createdAt IS NULL OR updatedAt IS NULL;

-- Update NULL dates in Users table (safe approach)
UPDATE Users SET 
    createdAt = COALESCE(createdAt, '2020-01-01 00:00:00'),
    updatedAt = COALESCE(updatedAt, '2020-01-01 00:00:00')
WHERE createdAt IS NULL OR updatedAt IS NULL;

-- Verify updates
SELECT 'Roles' AS table_name, COUNT(*) AS count FROM Roles 
WHERE createdAt = '0000-00-00 00:00:00' OR updatedAt = '0000-00-00 00:00:00'
UNION ALL
SELECT 'Users' AS table_name, COUNT(*) AS count FROM Users
WHERE createdAt = '0000-00-00 00:00:00' OR updatedAt = '0000-00-00 00:00:00';
