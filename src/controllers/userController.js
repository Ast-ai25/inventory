const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Role = require("../models/Role");
const authMiddleware = require("../middleware/authMiddleware");

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ include: "Role" });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

// Get single user
exports.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { include: "Role" });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user" });
    }
};

// Create new user (admin only)
exports.createUser = async (req, res) => {
    try {
        const { email, password, roleId } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
            role_id: roleId,
            company_id: req.user.company_id
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: "Error creating user" });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.update(req.body);
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: "Error updating user" });
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
