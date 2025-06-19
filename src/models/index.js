const sequelize = require('../config/database');

// const User = require('./User');

// const Permission = require('./Permission');

// const Company = require('./Company');
// const CompanyBranch = require('./CompanyBranch');
const Country = require('./Country');
const State = require('./State');
const City = require('./City');
const Role = require('./Role');
const RolePermission = require('./RolePermission');
const Language = require('./Language');
const LanguageAvailability = require('./LanguageAvailability');
const Currency = require('./Currency');
const Category = require('./Category');
const Subcategory = require('./Subcategory');
const Brand = require('./Brand');
const Product = require('./Product');
const Customer = require('./Customer');
const PortalUser = require('./PortalUser');
const PortalStaff = require('./PortalStaff');
const Company = require('./Company');
const Branch = require('./Branch');
const Notification = require('./Notification');
const ProductPricing = require('./ProductPricing');
const Expense = require('./Expense');
const ProductSerial = require('./ProductSerial');
const Inventory = require('./Inventory');
const Supplier = require('./Supplier');
const ProductSupplierPrice = require('./ProductSupplierPrice');
const Purchase = require('./Purchase');
const Sale = require('./Sale');
const SaleItem = require('./SaleItem');
const Invoice = require('./Invoice');
const Payment = require('./Payment');
const Return = require('./Return');
const Replacement = require('./Replacement');

// Sync all models with database
sequelize.sync({ alter: true })
    .then(() => console.log("✅ All models synced with database."))
    .catch(err => console.error("❌ Model sync failed:", err));

module.exports = {
    Country,
    State,
    City,
    Role,
    RolePermission,
    Language,
    LanguageAvailability,
    Currency,
    Category,
    Subcategory,
    Brand,
    Product,
    Customer,
    PortalUser,
    PortalStaff,
    Branch,
    Notification,
    ProductPricing,
    Expense,
    ProductSerial,
    Inventory,
    Supplier,
    ProductSupplierPrice,
    Purchase,
    Sale,
    SaleItem,
    Invoice,
    Payment,
    Return,
    Replacement
};
