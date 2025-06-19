const Country = require("../models/Country");

exports.createCountry = async (req, res) => {
    try {
        const { name, country_code } = req.body;
        const country = await Country.create({ name, country_code });
        res.status(201).json(country);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllCountries = async (req, res) => {
    try {
        const countries = await Country.findAll();
        res.json(countries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCountryById = async (req, res) => {
    try {
        const country = await Country.findByPk(req.params.id);
        if (!country) return res.status(404).json({ message: "Country not found" });
        res.json(country);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCountry = async (req, res) => {
    try {
        const { name, country_code } = req.body;
        const country = await Country.findByPk(req.params.id);
        if (!country) return res.status(404).json({ message: "Country not found" });

        await country.update({ name, country_code });
        res.json(country);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCountry = async (req, res) => {
    try {
        const country = await Country.findByPk(req.params.id);
        if (!country) return res.status(404).json({ message: "Country not found" });

        await country.destroy();
        res.json({ message: "Country deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
