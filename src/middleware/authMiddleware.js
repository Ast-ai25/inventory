// JWT Middleware
const jwt = require("jsonwebtoken");
const { models } = require("../models"); // This runs all associations
const User = models.User;
const Role = models.Role;
const Permission = models.Permission;

exports.verifyToken = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    console.log('Auth Header:', authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded JWT:', decoded);
        const user = await User.findByPk(decoded.id, {
            include: [
                {
                    model: Role,
                    as: 'Role',
                    include: [{
                        model: Permission,
                        as: 'Permissions',
                        through: { attributes: [] }
                    }]
                },
                {
                    model: models.Company,
                    as: 'Company',
                    include: [{
                        model: models.TenantRegistry,
                        as: 'TenantRegistry'
                    }]
                }
            ]
        });
        if (!user) {
            console.error("User not found with ID from JWT:", decoded.id);
            return res.status(404).json({ message: "User not found" });
        }
        const userObj = {
            ...user.get({ plain: true }),
            tenant_id: user.Company?.TenantRegistry?.id || null,
            Role: {
                ...(user.Role?.get({ plain: true }) || {}),
                name: decoded.role // Preserve role from JWT
            }
        };
        console.log('Constructed user object:', JSON.stringify(userObj, null, 2));
        req.user = userObj;
        if (user.Company) {
            req.tenant = user.Company; // Set tenant context if available
        }
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token." });
    }
};
exports.checkPermission = (requiredPermission) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const hasPermission = req.user.Role.Permissions.some(p =>
            p.name === requiredPermission ||
            p.name === requiredPermission + 's' ||
            p.name === requiredPermission.slice(0, -1)
        );
        console.log('User permissions:', req.user.Role.Permissions.map(p => p.name));
        console.log('Required permission:', requiredPermission);

        if (!hasPermission) {
            return res.status(403).json({ message: "Forbidden - Insufficient permissions" });
        }

        next();
    };
};
