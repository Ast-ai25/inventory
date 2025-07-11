const { models } = require('../models');
const Currency = models.Currency;

// Create a new currency
exports.createCurrency = async (req, res) => {
  try {
    const { code, name, symbol, is_active } = req.body;
    const currency = await Currency.create({ code, name, symbol, is_active });
    res.status(201).json(currency);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all currencies
exports.getAllCurrencies = async (req, res) => {
  try {
    const currencies = await Currency.findAll();
    res.status(200).json(currencies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single currency by ID
exports.getCurrencyById = async (req, res) => {
  try {
    const currency = await Currency.findByPk(req.params.id);
    if (currency) {
      res.status(200).json(currency);
    } else {
      res.status(404).json({ error: 'Currency not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a currency
exports.updateCurrency = async (req, res) => {
  try {
    const [updated] = await Currency.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedCurrency = await Currency.findByPk(req.params.id);
      res.status(200).json(updatedCurrency);
    } else {
      res.status(404).json({ error: 'Currency not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a currency
exports.deleteCurrency = async (req, res) => {
  try {
    const deleted = await Currency.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Currency not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
