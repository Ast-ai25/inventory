const { models } = require("../models");
const CurrencyAvailability = models.CurrencyAvailability;
const Currency = models.Currency;
const Country = models.Country;

exports.create = async (req, res) => {
    try {
        const { currency_id, country_id, is_active } = req.body;
        const currencyAvailability = await CurrencyAvailability.create({ 
            currency_id, 
            country_id, 
            is_active 
        });
        res.status(201).json(currencyAvailability);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const currencyAvailabilities = await CurrencyAvailability.findAll({
            include: [
                { model: Currency, as: 'Currency' },
                { model: Country, as: 'Country' }
            ]
        });
        res.json(currencyAvailabilities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const currencyAvailability = await CurrencyAvailability.findByPk(req.params.id, {
            include: [
                { model: Currency, as: 'Currency' },
                { model: Country, as: 'Country' }
            ]
        });
        if (!currencyAvailability) return res.status(404).json({ message: "Currency availability not found" });
        res.json(currencyAvailability);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { currency_id, country_id, is_active } = req.body;
        const currencyAvailability = await CurrencyAvailability.findByPk(req.params.id);
        if (!currencyAvailability) return res.status(404).json({ message: "Currency availability not found" });

        await currencyAvailability.update({ 
            currency_id, 
            country_id, 
            is_active 
        });
        res.json(currencyAvailability);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const currencyAvailability = await CurrencyAvailability.findByPk(req.params.id);
        if (!currencyAvailability) return res.status(404).json({ message: "Currency availability not found" });

        await currencyAvailability.destroy();
        res.json({ message: "Currency availability deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
