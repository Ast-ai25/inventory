const express = require('express');
const router = express.Router();
const controller = require('../controllers/companyTypeController');
const { verifyToken: protect, checkPermission } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
    .get(checkPermission('read_company_type'), controller.getAll)
    .post(checkPermission('create_company_type'), controller.create);

router.route('/:id')
    .put(checkPermission('update_company_type'), controller.update)
    .delete(checkPermission('delete_company_type'), controller.remove);

module.exports = router;
