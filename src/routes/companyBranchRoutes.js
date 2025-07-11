const express = require('express');
const router = express.Router();
const companyBranchController = require('../controllers/companyBranchController');
const { verifyToken: protect, checkPermission } = require('../middleware/authMiddleware');

// Protect all branch routes, enforce permissions
router.use(protect);

router.route('/')
  .post(checkPermission('create_company_branch'), companyBranchController.createCompanyBranch)
  .get(checkPermission('read_company_branch'), companyBranchController.getAllCompanyBranches);

router.route('/:id')
  .get(checkPermission('read_company_branch'), companyBranchController.getCompanyBranchById)
  .put(checkPermission('update_company_branch'), companyBranchController.updateCompanyBranch)
  .delete(checkPermission('delete_company_branch'), companyBranchController.deleteCompanyBranch);

module.exports = router;
