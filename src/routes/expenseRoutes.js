const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { verifyToken: protect, checkPermission } = require('../middleware/authMiddleware');

// Protect all expense routes and enforce permissions
router.use(protect);

router.route('/')
  .post(checkPermission('create_expense'), expenseController.createExpense)
  .get(checkPermission('read_expense'), expenseController.getAllExpenses);

router.route('/:id')
  .get(checkPermission('read_expense'), expenseController.getExpenseById)
  .put(checkPermission('update_expense'), expenseController.updateExpense)
  .delete(checkPermission('delete_expense'), expenseController.deleteExpense);

module.exports = router;
