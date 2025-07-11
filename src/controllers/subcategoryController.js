const Subcategory = require("../models/Subcategory");
const Category = require("../models/Category");

exports.getAllSubcategories = async (req, res) => {
    const items = await Subcategory.findAll({ include: Category });
    res.json(items);
};

exports.getSubcategoryById = async (req, res) => {
    const item = await Subcategory.findByPk(req.params.id, { include: Category });
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
};

exports.createSubcategory = async (req, res) => {
    const created = await Subcategory.create(req.body);
    res.status(201).json(created);
};

exports.updateSubcategory = async (req, res) => {
    await Subcategory.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Updated successfully" });
};

exports.deleteSubcategory = async (req, res) => {
    await Subcategory.destroy({ where: { id: req.params.id } });
    res.json({ message: "Deleted successfully" });
};
