const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Product routes
router.get('/', authMiddleware.verifyToken, productController.getAllProducts);
router.get('/:id', authMiddleware.verifyToken, productController.getProduct);
router.post('/', authMiddleware.verifyToken, productController.createProduct);
router.put('/:id', authMiddleware.verifyToken, productController.updateProduct);
router.delete('/:id', authMiddleware.verifyToken, productController.deleteProduct);

module.exports = router;
