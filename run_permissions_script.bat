@echo off
"C:\xampp\mysql\bin\mysql.exe" -u root -p inventory ^
  -e "source d:/Xamp/sass/techno/inventory-backend/src/seeders/add_language_availability_permissions.sql"
