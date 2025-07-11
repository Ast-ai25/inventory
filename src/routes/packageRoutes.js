const express = require('express');
const router = express.Router();
const controller = require('../controllers/packageController');
const { verifyToken, checkPermission } = require('../middleware/authMiddleware');

router.use(verifyToken);

router.route('/')
    .get(checkPermission('read_package'), controller.getAllPackages)
    .post(checkPermission('create_package'), controller.createPackage);

router.route('/:id')
    .get(checkPermission('read_package'), controller.getPackageById)
    .put(checkPermission('update_package'), controller.updatePackage)
    .delete(checkPermission('delete_package'), controller.deletePackage);

module.exports = router;
