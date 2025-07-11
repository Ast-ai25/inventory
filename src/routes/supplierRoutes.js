const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { verifyToken: protect, checkPermission } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
    .get(checkPermission('read_supplier'), supplierController.getAll)
    .post(checkPermission('create_supplier'), supplierController.create);

router.route('/:id')
    .get(checkPermission('read_supplier'), supplierController.getById)
    .put(checkPermission('update_supplier'), supplierController.update)
    .delete(checkPermission('delete_supplier'), supplierController.remove);

module.exports = router;
