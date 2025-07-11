const express = require('express');
const router = express.Router();
const controller = require('../controllers/packageModulePermissionController');
const { verifyToken, checkPermission } = require('../middleware/authMiddleware');

router.use(verifyToken);

router.get('/', checkPermission('read_package_module_permissions'), controller.getAll);
router.get('/:id', checkPermission('read_package_module_permissions'), controller.getById);
router.get('/package/:packageId', checkPermission('read_package_module_permissions'), controller.getByPackage);
router.post('/', checkPermission('create_package_module_permissions'), controller.create);
router.put('/:id', checkPermission('update_package_module_permissions'), controller.update);
router.delete('/:id', checkPermission('delete_package_module_permissions'), controller.delete);
router.delete('/package/:packageId', checkPermission('delete_package_module_permissions'), controller.deleteByPackage);

router.post('/batch', checkPermission('create_package_module_permissions'), controller.createBatch);

module.exports = router;
