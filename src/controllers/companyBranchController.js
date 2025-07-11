const { models } = require('../models');
const CompanyBranch = models.CompanyBranch;
const Company = models.Company;

// Create a new company branch
exports.createCompanyBranch = async (req, res) => {
    try {
        const { company_id, name, address, telephone } = req.body;
        const branch = await CompanyBranch.create({ company_id, name, address, telephone });
        res.status(201).json(branch);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all company branches
exports.getAllCompanyBranches = async (req, res) => {
    try {
        const branches = await CompanyBranch.findAll({ include: Company });
        res.status(200).json(branches);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single branch by ID
exports.getCompanyBranchById = async (req, res) => {
    try {
        const branch = await CompanyBranch.findByPk(req.params.id, { include: Company });
        if (branch) {
            res.status(200).json(branch);
        } else {
            res.status(404).json({ error: 'Company branch not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a company branch
exports.updateCompanyBranch = async (req, res) => {
    try {
        const [updated] = await CompanyBranch.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedBranch = await CompanyBranch.findByPk(req.params.id);
            res.status(200).json(updatedBranch);
        } else {
            res.status(404).json({ error: 'Company branch not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a company branch
exports.deleteCompanyBranch = async (req, res) => {
    try {
        const deleted = await CompanyBranch.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Company branch not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
