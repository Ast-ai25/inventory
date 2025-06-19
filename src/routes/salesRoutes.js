const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');
const authMiddleware = require('../middleware/authMiddleware');

// Sales routes
router.post('/', authMiddleware.verifyToken, salesController.createSale);
router.get('/', authMiddleware.verifyToken, salesController.getAllSales);
router.get('/:id', authMiddleware.verifyToken, salesController.getSale);
router.put('/:id/status', authMiddleware.verifyToken, salesController.updateSaleStatus);

module.exports = router;
