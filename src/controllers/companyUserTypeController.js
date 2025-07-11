const CompanyUserType = require('../models/CompanyUserType');
const Company = require('../models/Company');

exports.getAll = async (req, res) => {
    const types = await CompanyUserType.findAll({ include: [{ model: Company, as: 'Company' }] });
    res.json(types);
};

exports.create = async (req, res) => {
    const { name, company_id, is_active } = req.body;
    const result = await CompanyUserType.create({ name, company_id, is_active });
    res.json(result);
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { name, company_id, is_active } = req.body;
    await CompanyUserType.update({ name, company_id, is_active }, { where: { id } });
    res.json({ message: 'Updated successfully' });
};

exports.remove = async (req, res) => {
    const { id } = req.params;
    await CompanyUserType.destroy({ where: { id } });
    res.json({ message: 'Deleted successfully' });
};
