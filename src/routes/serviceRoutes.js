const express = require('express');
const router = express.Router();
const controller = require('../controllers/serviceController');
const { verifyToken, checkPermission } = require('../middleware/authMiddleware');

router.use(verifyToken);

router.route('/')
    .get(checkPermission('read_service'), controller.getAllServices)
    .post(checkPermission('create_service'), controller.createService);

router.route('/:id')
    .get(checkPermission('read_service'), controller.getServiceById)
    .put(checkPermission('update_service'), controller.updateService)
    .delete(checkPermission('delete_service'), controller.deleteService);

module.exports = router;
