const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

// Notification routes
router.post('/', authMiddleware.verifyToken, notificationController.createNotification);
router.get('/', authMiddleware.verifyToken, notificationController.getUserNotifications);
router.put('/:id/read', authMiddleware.verifyToken, notificationController.markAsRead);
router.get('/unread-count', authMiddleware.verifyToken, notificationController.getUnreadCount);

module.exports = router;
