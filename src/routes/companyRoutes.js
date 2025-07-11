const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const { verifyToken: protect, checkPermission } = require('../middleware/authMiddleware');

// Protect all company routes and enforce permissions
router.use(protect);

router.route('/')
  .post(checkPermission('create_company'), companyController.createCompany)
  .get(checkPermission('read_company'), companyController.getAllCompanies);

router.route('/:id')
  .get(checkPermission('read_company'), companyController.getCompanyById)
  .put(checkPermission('update_company'), companyController.updateCompany)
  .delete(checkPermission('delete_company'), companyController.deleteCompany);

module.exports = router;
