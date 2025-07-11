-- Create currency_availabilities table
CREATE TABLE `currency_availabilities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currency_id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `currency_country_unique` (`currency_id`,`country_id`),
  KEY `country_id` (`country_id`),
  CONSTRAINT `currency_availabilities_ibfk_1` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`),
  CONSTRAINT `currency_availabilities_ibfk_2` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Add permissions
INSERT INTO `permissions` (`name`, `description`) VALUES
('create_currency_availability', 'Create currency availability'),
('read_currency_availability', 'View currency availability'),
('update_currency_availability', 'Update currency availability'),
('delete_currency_availability', 'Delete currency availability');

-- Assign permissions to Super Admin role
INSERT INTO `role_permissions` (`role_id`, `permission_id`)
SELECT r.id, p.id FROM `roles` r, `permissions` p 
WHERE r.name = 'Super Admin' AND p.name LIKE '%currency_availability%';
