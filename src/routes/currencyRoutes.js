const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currencyController');
const { verifyToken: protect, checkPermission } = require('../middleware/authMiddleware');

// Protect all currency routes and enforce permissions
router.use(protect);

router.route('/')
  .post(checkPermission('create_currency'), currencyController.createCurrency)
  .get(checkPermission('read_currency'), currencyController.getAllCurrencies);

router.route('/:id')
  .get(checkPermission('read_currency'), currencyController.getCurrencyById)
  .put(checkPermission('update_currency'), currencyController.updateCurrency)
  .delete(checkPermission('delete_currency'), currencyController.deleteCurrency);

module.exports = router;
