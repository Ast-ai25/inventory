const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.verifyToken, authMiddleware.checkPermission('create_role'), roleController.create);
router.get('/', authMiddleware.verifyToken, authMiddleware.checkPermission('read_role'), roleController.getAll);
router.get('/:id', authMiddleware.verifyToken, authMiddleware.checkPermission('read_role'), roleController.getById);
router.put('/:id', authMiddleware.verifyToken, authMiddleware.checkPermission('update_role'), roleController.update);
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.checkPermission('delete_role'), roleController.delete);

module.exports = router;
