// User authentication
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Company = require("../models/Company");
const Role = require("../models/Role");
const Permission = require("../models/Permission");

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
    console.log(`Login attempt for email: ${email}`);
    const user = await User.findOne({ 
        where: { email },
        include: [
            {
                model: Role,
                as: 'Role',
                include: [{
                    model: Company,
                    as: 'Company'
                }]
            },
            {
                model: Company,
                as: 'Company'
            }
        ]
    });
    
    if (!user) {
        console.log('User not found');
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    console.log(`Password match result: ${passwordMatch}`);
    
    if (!passwordMatch) {
        console.log('Password does not match');
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
        { id: user.id, role: user.Role.name },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );

    // Get permissions for the role through eager loading
    const roleWithPermissions = await Role.findOne({
        where: { id: user.role_id },
        include: [
            {
                model: Permission,
                as: 'Permissions',
                through: { attributes: [] }
            },
            {
                model: Company,
                as: 'Company'
            }
        ]
    });
    const permissionNames = roleWithPermissions.Permissions.map(p => p.name);

    console.log('--- Successful Login Details ---');
    console.log('Admin User:', {
        id: user.id,
        email: user.email,
        role: user.Role.name
    });
    console.log('Permissions:', permissionNames);
    
    res.json({ 
        token, 
        user: {
            ...user.toJSON(),
            permissions: permissionNames
        }
    });
};

// User logout
exports.logout = async (req, res) => {
    // In a real implementation, we would invalidate the token
    res.json({ message: "Logged out successfully" });
};

// Verify token
exports.verify = async (req, res) => {
    // The verifyToken middleware has already run and verified the token.
    // If it fails, it will not reach this controller.
    // So, if we are here, the token is valid.
    res.status(200).json({ valid: true, user: req.user });
};
