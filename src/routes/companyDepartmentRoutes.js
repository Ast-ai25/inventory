const express = require('express');
const router = express.Router();
const controller = require('../controllers/companyDepartmentController');
const { verifyToken: protect, checkPermission } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
    .post(checkPermission('create_company_department'), controller.create)
    .get(checkPermission('read_company_department'), controller.getAll);

router.route('/:id')
    .put(checkPermission('update_company_department'), controller.update)
    .delete(checkPermission('delete_company_department'), controller.remove);

module.exports = router;
