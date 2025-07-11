const { models } = require('../models');
const Company = models.Company;
const PortalUser = models.PortalUser;
const CompanyType = models.CompanyType;
const Brand = models.Brand;
// Create a new company
exports.createCompany = async (req, res) => {
    try {
        const { is_brand, user_id, company_type_id, name, logo, email, address, hq_address, telephone,
            contact1_name, contact1_mobile, contact1_email,
            contact2_name, contact2_mobile, contact2_email,
            gstin, website, letterhead_design, signature, brand_ids } = req.body;

        const companyData = {
            company_type_id, name, logo, email, address, hq_address, telephone,
            contact1_name, contact1_mobile, contact1_email,
            contact2_name, contact2_mobile, contact2_email,
            gstin, website, letterhead_design, signature
        };

        if (is_brand) {
            companyData.user_id = req.user ? req.user.id : null;
        } else {
            companyData.user_id = user_id ? parseInt(user_id, 10) : null;
        }

        const company = await Company.create(companyData);
        
        if (brand_ids && brand_ids.length) {
            await company.setBrands(brand_ids);
        }
        res.status(201).json(company);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all companies
exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.findAll({ include: [PortalUser, { model: CompanyType, as: 'CompanyType' }, { model: Brand, as: 'Brands' }] });
        res.status(200).json(companies);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single company by ID
exports.getCompanyById = async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.id, { include: [PortalUser, { model: CompanyType, as: 'CompanyType' }, { model: Brand, as: 'Brands' }] });
        if (company) {
            res.status(200).json(company);
        } else {
            res.status(404).json({ error: 'Company not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a company
exports.updateCompany = async (req, res) => {
    try {
        const { is_brand, user_id } = req.body;
        const updateData = { ...req.body };

        if (is_brand) {
            updateData.user_id = req.user ? req.user.id : null;
        } else {
            updateData.user_id = user_id ? parseInt(user_id, 10) : null;
        }

        const [updated] = await Company.update(updateData, { where: { id: req.params.id } });
        if (updated) {
            const company = await Company.findByPk(req.params.id);
            if (req.body.brand_ids) {
                await company.setBrands(req.body.brand_ids);
            }
            const updatedCompany = await Company.findByPk(req.params.id, {
                include: [
                    PortalUser,
                    { model: CompanyType, as: 'CompanyType' },
                    { model: Brand, as: 'Brands' }
                ]
            });
            res.status(200).json(updatedCompany);
        } else {
            res.status(404).json({ error: 'Company not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a company
exports.deleteCompany = async (req, res) => {
    try {
        const deleted = await Company.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Company not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
