const express = require('express');
const router = express.Router();
const chargeController = require('../controllers/chargeController');
const { verifyToken, checkPermission } = require('../middleware/authMiddleware');

router.use(verifyToken);

router.route('/')
    .get(checkPermission('read_charge'), chargeController.getAllCharges)
    .post(checkPermission('create_charge'), chargeController.createCharge);

router.route('/:id')
    .get(checkPermission('read_charge'), chargeController.getChargeById)
    .put(checkPermission('update_charge'), chargeController.updateCharge)
    .delete(checkPermission('delete_charge'), chargeController.deleteCharge);

module.exports = router;
