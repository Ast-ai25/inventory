const { models } = require('../models');
const Invoice = models.Invoice;
const Company = models.Company;

// Create a new invoice
exports.createInvoice = async (req, res) => {
  try {
    const { invoice_number, company_id, date, total_amount } = req.body;
    const inv = await Invoice.create({ invoice_number, company_id, date, total_amount });
    res.status(201).json(inv);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const list = await Invoice.findAll({ include: Company });
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const inv = await Invoice.findByPk(req.params.id, { include: Company });
    if (inv) {
      res.status(200).json(inv);
    } else {
      res.status(404).json({ error: 'Invoice not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an invoice
exports.updateInvoice = async (req, res) => {
  try {
    const [updated] = await Invoice.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const inv = await Invoice.findByPk(req.params.id);
      res.status(200).json(inv);
    } else {
      res.status(404).json({ error: 'Invoice not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an invoice
exports.deleteInvoice = async (req, res) => {
  try {
    const deleted = await Invoice.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Invoice not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
