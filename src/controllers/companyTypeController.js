const CompanyType = require('../models/CompanyType');

exports.getAll = async (req, res) => {
    const types = await CompanyType.findAll();
    res.json(types);
};

exports.create = async (req, res) => {
    const { name, is_active } = req.body;
    const result = await CompanyType.create({ name, is_active });
    res.json(result);
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { name, is_active } = req.body;
    await CompanyType.update({ name, is_active }, { where: { id } });
    res.json({ message: 'Updated successfully' });
};

exports.remove = async (req, res) => {
    const { id } = req.params;
    await CompanyType.destroy({ where: { id } });
    res.json({ message: 'Deleted successfully' });
};
