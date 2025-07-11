const express = require('express');
const router = express.Router();
const controller = require('../controllers/measureUnitController');
const { verifyToken: protect, checkPermission } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
    .get(checkPermission('read_measure_unit'), controller.getAll)
    .post(checkPermission('create_measure_unit'), controller.create);

router.route('/:id')
    .put(checkPermission('update_measure_unit'), controller.update)
    .delete(checkPermission('delete_measure_unit'), controller.remove);

module.exports = router;
