const State = require("../models/State");
const Country = require("../models/Country");

exports.createState = async (req, res) => {
    try {
        const { name, country_id } = req.body;
        const state = await State.create({ name, country_id });
        res.status(201).json(state);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllStates = async (req, res) => {
    try {
        const states = await State.findAll({ include: Country });
        res.json(states);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStateById = async (req, res) => {
    try {
        const state = await State.findByPk(req.params.id, { include: Country });
        if (!state) return res.status(404).json({ message: "State not found" });
        res.json(state);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStatesByCountry = async (req, res) => {
    try {
        const states = await State.findAll({ where: { country_id: req.params.country_id } });
        res.json(states);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateState = async (req, res) => {
    try {
        const { name, country_id } = req.body;
        const state = await State.findByPk(req.params.id);
        if (!state) return res.status(404).json({ message: "State not found" });

        await state.update({ name, country_id });
        res.json(state);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteState = async (req, res) => {
    try {
        const state = await State.findByPk(req.params.id);
        if (!state) return res.status(404).json({ message: "State not found" });

        await state.destroy();
        res.json({ message: "State deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
