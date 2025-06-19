// User authentication
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Company = require("../models/Company");
const Role = require("../models/Role");

// Register new company and admin user
exports.register = async (req, res) => {
    const { companyName, email, password, countryId, currencyId, languageId } = req.body;

    try {
        // Create company
        const company = await Company.create({
            name: companyName,
            country_id: countryId,
            currency_id: currencyId,
            language_id: languageId
        });

        // Create admin role
        const adminRole = await Role.create({
            name: "Admin",
            company_id: company.id
        });

        // Create admin user
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await User.create({
            company_id: company.id,
            email,
            password: hashedPassword,
            role_id: adminRole.id
        });

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, role: "Admin" },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.status(201).json({ token, user });
    } catch (error) {
        res.status(400).json({ message: "Registration failed", error: error.message });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }, include: "Role" });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
        { id: user.id, role: user.Role.name },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );

    res.json({ token, user });
};

// User logout
exports.logout = async (req, res) => {
    // In a real implementation, we would invalidate the token
    res.json({ message: "Logged out successfully" });
};
