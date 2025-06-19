const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Admin-only routes
router.get('/', authMiddleware.verifyToken, userController.getAllUsers);
router.post('/', authMiddleware.verifyToken, userController.createUser);
router.delete('/:id', authMiddleware.verifyToken, userController.deleteUser);

// Authenticated user routes
router.get('/:id', authMiddleware.verifyToken, userController.getUser);
router.put('/:id', authMiddleware.verifyToken, userController.updateUser);

module.exports = router;
