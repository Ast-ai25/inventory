const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.verifyToken, moduleController.createModule);
router.get('/', authMiddleware.verifyToken, moduleController.getAllModules);
router.get('/:id', authMiddleware.verifyToken, moduleController.getModuleById);
router.put('/:id', authMiddleware.verifyToken, moduleController.updateModule);
router.delete('/:id', authMiddleware.verifyToken, moduleController.deleteModule);

module.exports = router;
