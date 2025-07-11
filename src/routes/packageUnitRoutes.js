const express = require('express');
const router = express.Router();
const controller = require('../controllers/packageUnitController');
const { verifyToken: protect, checkPermission } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
    .get(checkPermission('read_package_unit'), controller.getAll)
    .post(checkPermission('create_package_unit'), controller.create);

router.route('/:id')
    .put(checkPermission('update_package_unit'), controller.update)
    .delete(checkPermission('delete_package_unit'), controller.remove);

module.exports = router;
