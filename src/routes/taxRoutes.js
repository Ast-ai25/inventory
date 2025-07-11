const express = require('express');
const router = express.Router();
const taxController = require('../controllers/taxController');
const { verifyToken, checkPermission } = require('../middleware/authMiddleware');

// Apply token verification to all routes
router.use(verifyToken);

router.route('/')
    .get(checkPermission('read_tax'), taxController.getAllTaxes)
    .post(checkPermission('create_tax'), taxController.createTax);

router.route('/:id')
    .get(checkPermission('read_tax'), taxController.getTaxById)
    .put(checkPermission('update_tax'), taxController.updateTax)
    .delete(checkPermission('delete_tax'), taxController.deleteTax);

module.exports = router;
