const express = require('express');
const router = express.Router();
const controller = require('../controllers/paymentModeController');
const { verifyToken, checkPermission } = require('../middleware/authMiddleware');

router.use(verifyToken);

router.route('/')
    .get(checkPermission('read_payment_mode'), controller.getAllPaymentModes)
    .post(checkPermission('create_payment_mode'), controller.createPaymentMode);

router.route('/:id')
    .get(checkPermission('read_payment_mode'), controller.getPaymentModeById)
    .put(checkPermission('update_payment_mode'), controller.updatePaymentMode)
    .delete(checkPermission('delete_payment_mode'), controller.deletePaymentMode);

module.exports = router;
