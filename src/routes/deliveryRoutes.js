const express = require('express');
const router = express.Router();
const controller = require('../controllers/deliveryController');
const { verifyToken, checkPermission } = require('../middleware/authMiddleware');

router.use(verifyToken);

router.route('/')
    .get(checkPermission('read_delivery'), controller.getAllDeliveries)
    .post(checkPermission('create_delivery'), controller.createDelivery);

router.route('/:id')
    .get(checkPermission('read_delivery'), controller.getDeliveryById)
    .put(checkPermission('update_delivery'), controller.updateDelivery)
    .delete(checkPermission('delete_delivery'), controller.deleteDelivery);

module.exports = router;
