const { body } = require('express-validator');

exports.validateCurrencyAvailability = [
  body('currency_id')
    .notEmpty().withMessage('Currency ID is required')
    .isInt().withMessage('Currency ID must be an integer'),
  body('country_id')
    .notEmpty().withMessage('Country ID is required')
    .isInt().withMessage('Country ID must be an integer'),
  body('is_active')
    .optional()
    .isBoolean().withMessage('Active status must be a boolean')
];

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
