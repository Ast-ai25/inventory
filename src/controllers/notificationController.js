const Notification = require("../models/Notification");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// Create notification
exports.createNotification = async (req, res) => {
    try {
        const { user_id, message, notification_type } = req.body;
        const created_by = req.user.id;

        const notification = await Notification.create({
            user_id,
            message,
            created_by,
            notification_type,
            status: 'pending'
        });

        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: "Error creating notification" });
    }
};

// Get all notifications for user
exports.getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            where: { user_id: req.user.id },
            order: [['createdAt', 'DESC']]
        });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notifications" });
    }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        await notification.update({ status: 'sent' });
        res.json(notification);
    } catch (error) {
        res.status(400).json({ message: "Error updating notification" });
    }
};

// Get unread notifications count
exports.getUnreadCount = async (req, res) => {
    try {
        const count = await Notification.count({
            where: {
                user_id: req.user.id,
                status: 'pending'
            }
        });
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: "Error fetching notification count" });
    }
};
