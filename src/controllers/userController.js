const bcrypt = require("bcryptjs");
const { sequelize } = require("../config/database");
const User = require("../models/User");
const Role = require("../models/Role");
const TenantRegistry = require("../models/TenantRegistry");
const authMiddleware = require("../middleware/authMiddleware");

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ include: ["Role", "Country", "Company", "Department", "CompanyUserType", "Package", "Branch"] });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

// Get single user
exports.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { 
            include: [
                "Role",
                { association: "Country" },
                { association: "Company" },
                { association: "Department" },
                { association: "CompanyUserType" },
                { association: "Package" },
                { association: "Branch" }
            ]
        });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({
            ...user.get({ plain: true }),
            company_registered: !!user.company_id
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user" });
    }
};

// Create new user (admin only)
exports.createUser = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { 
            name,
            email, 
            password, 
            role_id,
            country_id,
            company_id,
            company_registered,
            company_user_type_id,
            department_id,
            branch_id,
            package_id,
            is_active = true,
            use_default_db = true,
            db_name,
            db_user,
            db_password,
            db_host
        } = req.body;

        // Validate database fields if not using default
        if (!use_default_db && (!db_name || !db_user || !db_host)) {
            return res.status(400).json({ message: "Custom database requires name, user and host" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role_id,
            country_id,
            company_id: company_registered ? company_id : null,
            company_user_type_id: company_registered ? company_user_type_id : null,
            department_id: company_registered ? department_id : null,
            branch_id: branch_id || null,
            package_id,
            is_active,
            use_default_db,
            db_name,
            db_user,
            db_password,
            db_host,
            created_at: new Date(),
            updated_at: new Date()
        }, { transaction: t });

        // Check if role is "Sass" (tenant admin) and has company
        const role = await Role.findByPk(role_id);
        if (role.name === 'Sass' && company_registered && company_id) {
            // Create tenant registry entry
            await TenantRegistry.create({
                company_id,
                db_name: use_default_db ? `tenant_${company_id}` : db_name,
                db_host: use_default_db ? (process.env.DB_HOST || 'localhost') : db_host,
                db_user: use_default_db ? (process.env.DB_USER || 'root') : db_user,
                db_password: use_default_db ? (process.env.DB_PASSWORD || '') : db_password,
                package_id,
                expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
                is_active: true,
                needs_setup: !use_default_db // Flag if we need to create database structure
            }, { transaction: t });
        }

        await t.commit();
        res.status(201).json(user);
    } catch (error) {
        if (t) await t.rollback();
        console.error('Error creating user:', error);
        res.status(400).json({ 
            message: "Error creating user",
            error: error.message 
        });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const {
            company_registered,
            company_id,
            department_id,
            company_user_type_id,
            ...updateData
        } = req.body;

        // Clean up data before update
        const cleanData = {
            ...updateData,
            company_id: company_registered ? company_id : null,
            department_id: company_registered ? department_id : null,
            company_user_type_id: company_registered ? company_user_type_id : null,
            updated_at: new Date()
        };

        await user.update(cleanData);
        res.json(user);
    } catch (error) {
        console.error('Update user error:', error);
        res.status(400).json({ 
            message: "Error updating user",
            error: error.message 
        });
    }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.destroy();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
};
