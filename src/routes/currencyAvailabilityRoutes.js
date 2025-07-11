const express = require('express');
const router = express.Router();
const currencyAvailabilityController = require('../controllers/currencyAvailabilityController');
const { verifyToken, checkPermission } = require('../middleware/authMiddleware');
const { validateCurrencyAvailability } = require('../validators/currencyAvailabilityValidator');

router.get('/',
  verifyToken,
  checkPermission('read_currency_availability'),
  currencyAvailabilityController.getAll
);

router.get('/:id',
  verifyToken,
  checkPermission('read_currency_availability'),
  currencyAvailabilityController.getById
);

router.post('/',
  verifyToken,
  checkPermission('create_currency_availability'),
  validateCurrencyAvailability,
  currencyAvailabilityController.create
);

router.put('/:id',
  verifyToken,
  checkPermission('update_currency_availability'),
  validateCurrencyAvailability,
  currencyAvailabilityController.update
);

router.delete('/:id',
  verifyToken,
  checkPermission('delete_currency_availability'),
  currencyAvailabilityController.delete
);

module.exports = router;
