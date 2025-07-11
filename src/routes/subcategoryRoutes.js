const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');
const { verifyToken: protect, checkPermission } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
    .get(checkPermission('read_subcategory'), subcategoryController.getAllSubcategories)
    .post(checkPermission('create_subcategory'), subcategoryController.createSubcategory);

router.route('/:id')
    .get(checkPermission('read_subcategory'), subcategoryController.getSubcategoryById)
    .put(checkPermission('update_subcategory'), subcategoryController.updateSubcategory)
    .delete(checkPermission('delete_subcategory'), subcategoryController.deleteSubcategory);

module.exports = router;
