const express = require('express');
const router = express.Router();
const rmaController = require('../controllers/rmaController');
const authMiddleware = require('../middleware/authMiddleware');

// RMA routes
router.post('/', authMiddleware.verifyToken, rmaController.createReturn);
router.put('/:id/approve', authMiddleware.verifyToken, rmaController.approveReturn);
router.get('/', authMiddleware.verifyToken, rmaController.getAllReturns);
router.get('/:id', authMiddleware.verifyToken, rmaController.getReturn);

module.exports = router;
