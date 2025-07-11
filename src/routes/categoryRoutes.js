const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyToken: protect, checkPermission } = require('../middleware/authMiddleware');

// Protect all routes, and then check for specific permissions
router.use(protect);

router.route('/')
    .post(checkPermission('create_category'), categoryController.createCategory)
    .get(checkPermission('read_category'), categoryController.getAllCategories);

router.route('/:id')
    .get(checkPermission('read_category'), categoryController.getCategoryById)
    .put(checkPermission('update_category'), categoryController.updateCategory)
    .delete(checkPermission('delete_category'), categoryController.deleteCategory);

module.exports = router;
