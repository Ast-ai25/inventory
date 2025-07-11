const { models } = require('../models');
const Inventory = models.Inventory;
const Product = models.Product;

// Create a new inventory record
exports.createInventory = async (req, res) => {
  try {
    const { product_id, quantity, location } = req.body;
    const record = await Inventory.create({ product_id, quantity, location });
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all inventory records
exports.getAllInventories = async (req, res) => {
  try {
    const records = await Inventory.findAll({ include: Product });
    res.status(200).json(records);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single inventory record by ID
exports.getInventoryById = async (req, res) => {
  try {
    const record = await Inventory.findByPk(req.params.id, { include: Product });
    if (record) {
      res.status(200).json(record);
    } else {
      res.status(404).json({ error: 'Inventory record not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an inventory record
exports.updateInventory = async (req, res) => {
  try {
    const [updated] = await Inventory.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedRecord = await Inventory.findByPk(req.params.id);
      res.status(200).json(updatedRecord);
    } else {
      res.status(404).json({ error: 'Inventory record not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an inventory record
exports.deleteInventory = async (req, res) => {
  try {
    const deleted = await Inventory.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Inventory record not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
