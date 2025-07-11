const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { verifyToken: protect, checkPermission } = require('../middleware/authMiddleware');

// Protect all inventory routes and enforce permissions
router.use(protect);

router.route('/')
  .post(checkPermission('create_inventory'), inventoryController.createInventory)
  .get(checkPermission('read_inventory'), inventoryController.getAllInventories);

router.route('/:id')
  .get(checkPermission('read_inventory'), inventoryController.getInventoryById)
  .put(checkPermission('update_inventory'), inventoryController.updateInventory)
  .delete(checkPermission('delete_inventory'), inventoryController.deleteInventory);

module.exports = router;
