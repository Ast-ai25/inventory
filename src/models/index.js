// Original version of src/models/index.js restored as per user request
const { sequelize } = require('../config/database');

const User = require('./User');
const Permission = require('./Permission');
const Company = require('./Company');
const CompanyBranch = require('./CompanyBranch');
const Country = require('./Country');
const State = require('./State');
const City = require('./City');
const Role = require('./Role');
const RolePermission = require('./RolePermission');
const Language = require('./Language');
const LanguageAvailability = require('./LanguageAvailability');
const CurrencyAvailability = require('./CurrencyAvailability');
const Currency = require('./Currency');
const Category = require('./Category');
const Subcategory = require('./Subcategory');
const Brand = require('./Brand');
const Product = require('./Product');
const Customer = require('./Customer');
const PortalUser = require('./PortalUser');
const PortalStaff = require('./PortalStaff');
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
const CompanyType = require('./CompanyType');
const CompanyUserType = require('./CompanyUserType');
const CompanyDepartment = require('./CompanyDepartment');
const MeasureUnit = require('./MeasureUnit');
const PackageUnit = require('./PackageUnit');
const ProductMeasureUnit = require('./ProductMeasureUnit');
const ProductPackageUnit = require('./ProductPackageUnit');
const Tax = require('./Tax');
const Charge = require('./Charge');
const PaymentMode = require('./PaymentMode');
const Delivery = require('./Delivery');
const Service = require('./Service');
const Package = require('./Package');
const Module = require('./Module');
const PackageModulePermission = require('./PackageModulePermission');
const PackageUserLimit = require('./PackageUserLimit');
const TenantRegistry = require('./TenantRegistry');
// Set up model associations
const models = {
    TenantRegistry,
    User,
    Permission,
    Company,
    CompanyBranch,
    Country,
    State,
    City,
    Role,
    RolePermission,
    Language,
    LanguageAvailability,
    CurrencyAvailability,
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
    Replacement,
    CompanyType,
    CompanyUserType,
    CompanyDepartment,
    MeasureUnit,
    PackageUnit,
    ProductMeasureUnit,
    ProductPackageUnit,
    Tax,
    Charge,
    PaymentMode,
    Delivery,
    Service,
    Package,
    Module,
    PackageModulePermission,
    PackageUserLimit
};

// Initialize associations
console.log('Initializing model associations...');
Object.values(models).forEach(model => {
    console.log(`Processing model: ${model.name}`);
    if (model.associate) {
        console.log(`Setting up associations for ${model.name}`);
        model.associate(models);
        console.log(`Associations complete for ${model.name}`);
    }
});
console.log('All model associations initialized');

sequelize.sync()
    .then(() => console.log("✅ All models synced with database."))
    .catch(err => console.error("❌ Model sync failed:", err));

module.exports = {
    models,
    sequelize
};
