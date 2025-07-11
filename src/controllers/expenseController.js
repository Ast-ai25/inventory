const { models } = require('../models');
const Expense = models.Expense;
const CompanyBranch = models.CompanyBranch;

// Create a new expense
exports.createExpense = async (req, res) => {
  try {
    const { amount, description, date, company_branch_id } = req.body;
    const expense = await Expense.create({ amount, description, date, company_branch_id });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({ include: CompanyBranch });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id, { include: CompanyBranch });
    if (expense) {
      res.status(200).json(expense);
    } else {
      res.status(404).json({ error: 'Expense not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an expense
exports.updateExpense = async (req, res) => {
  try {
    const [updated] = await Expense.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedExpense = await Expense.findByPk(req.params.id);
      res.status(200).json(updatedExpense);
    } else {
      res.status(404).json({ error: 'Expense not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Expense not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
