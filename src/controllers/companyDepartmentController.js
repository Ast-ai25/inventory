const CompanyDepartment = require('../models/CompanyDepartment');

exports.getAll = async (req, res) => {
    const departments = await CompanyDepartment.findAll();
    res.json(departments);
};

exports.create = async (req, res) => {
    const { name, is_active } = req.body;
    const result = await CompanyDepartment.create({ name, is_active });
    res.json(result);
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { name, is_active } = req.body;
    await CompanyDepartment.update({ name, is_active }, { where: { id } });
    res.json({ message: 'Updated successfully' });
};

exports.remove = async (req, res) => {
    const { id } = req.params;
    await CompanyDepartment.destroy({ where: { id } });
    res.json({ message: 'Deleted successfully' });
};
