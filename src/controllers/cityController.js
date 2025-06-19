const City = require("../models/City");
const State = require("../models/State");
const Country = require("../models/Country");

exports.createCity = async (req, res) => {
    try {
        const { name, state_id, country_id } = req.body;
        const city = await City.create({ name, state_id, country_id });
        res.status(201).json(city);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllCities = async (req, res) => {
    try {
        const cities = await City.findAll({ include: [State, Country] });
        res.json(cities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCityById = async (req, res) => {
    try {
        const city = await City.findByPk(req.params.id, { include: [State, Country] });
        if (!city) return res.status(404).json({ message: "City not found" });
        res.json(city);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCitiesByState = async (req, res) => {
    try {
        const cities = await City.findAll({ where: { state_id: req.params.state_id } });
        res.json(cities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCitiesByCountry = async (req, res) => {
    try {
        const cities = await City.findAll({ where: { country_id: req.params.country_id } });
        res.json(cities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCity = async (req, res) => {
    try {
        const { name, state_id, country_id } = req.body;
        const city = await City.findByPk(req.params.id);
        if (!city) return res.status(404).json({ message: "City not found" });

        await city.update({ name, state_id, country_id });
        res.json(city);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCity = async (req, res) => {
    try {
        const city = await City.findByPk(req.params.id);
        if (!city) return res.status(404).json({ message: "City not found" });

        await city.destroy();
        res.json({ message: "City deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
