const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { verifyToken: protect, checkPermission } = require('../middleware/authMiddleware');

// Protect all invoice routes and enforce permissions
router.use(protect);

router.route('/')
  .post(checkPermission('create_invoice'), invoiceController.createInvoice)
  .get(checkPermission('read_invoice'), invoiceController.getAllInvoices);

router.route('/:id')
  .get(checkPermission('read_invoice'), invoiceController.getInvoiceById)
  .put(checkPermission('update_invoice'), invoiceController.updateInvoice)
  .delete(checkPermission('delete_invoice'), invoiceController.deleteInvoice);

module.exports = router;
