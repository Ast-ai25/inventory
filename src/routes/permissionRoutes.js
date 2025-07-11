const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware.verifyToken, authMiddleware.checkPermission('read_permission'), permissionController.getAll);
router.post('/', authMiddleware.verifyToken, authMiddleware.checkPermission('create_permission'), permissionController.create);
router.put('/:id', authMiddleware.verifyToken, authMiddleware.checkPermission('update_permission'), permissionController.update);
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.checkPermission('delete_permission'), permissionController.delete);

module.exports = router;
