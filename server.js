// Express server entry point
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Initialize database models
require('./src/models/index.js');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Mount global routes first (bypass tenant checks)
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/permissions", require("./src/routes/permissionRoutes"));

// Apply tenant middleware for all other routes
app.use(require('./src/middleware/tenantConnection'));

// Route imports (all other routes)
const userRoutes = require("./src/routes/userRoutes");
const countryRoutes = require("./src/routes/countryRoutes");
const stateRoutes = require("./src/routes/stateRoutes");
const cityRoutes = require("./src/routes/cityRoutes");
const productRoutes = require("./src/routes/productRoutes");
const salesRoutes = require("./src/routes/salesRoutes");
const rmaRoutes = require("./src/routes/rmaRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const brandRoutes = require("./src/routes/brandRoutes");
const languageRoutes = require("./src/routes/languageRoutes");
const companyRoutes = require("./src/routes/companyRoutes");
const companyBranchRoutes = require("./src/routes/companyBranchRoutes");
const currencyRoutes = require("./src/routes/currencyRoutes");
const expenseRoutes = require("./src/routes/expenseRoutes");
const inventoryRoutes = require("./src/routes/inventoryRoutes");
const invoiceRoutes = require("./src/routes/invoiceRoutes");
const languageAvailabilityRoutes = require("./src/routes/languageAvailabilityRoutes");
const currencyAvailabilityRoutes = require("./src/routes/currencyAvailabilityRoutes");
const roleRoutes = require("./src/routes/roleRoutes");
const permissionRoutes = require("./src/routes/permissionRoutes");
const companyTypeRoutes = require('./src/routes/companyTypeRoutes');
const companyUserTypeRoutes = require('./src/routes/companyUserTypeRoutes');
const companyDepartmentRoutes = require('./src/routes/companyDepartmentRoutes');
const subcategoryRoutes = require('./src/routes/subcategoryRoutes');
const measureUnitRoutes = require('./src/routes/measureUnitRoutes');
const packageUnitRoutes = require('./src/routes/packageUnitRoutes');
const taxRoutes = require('./src/routes/taxRoutes');
const chargeRoutes = require('./src/routes/chargeRoutes'); // <-- Add this line
const paymentModeRoutes = require('./src/routes/paymentModeRoutes');
const deliveryRoutes = require('./src/routes/deliveryRoutes');
const serviceRoutes = require('./src/routes/serviceRoutes');
const packageRoutes = require('./src/routes/packageRoutes');
const moduleRoutes = require('./src/routes/moduleRoutes');
const packageModulePermissionRoutes = require('./src/routes/packageModulePermissionRoutes');
const supplierRoutes = require('./src/routes/supplierRoutes');
// Default route
app.get('/', (req, res) => {
    res.send('Welcome to Inventory Management API!');
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/returns", rmaRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/languages", languageRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/company-branches", companyBranchRoutes);
app.use("/api/currencies", currencyRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/inventories", inventoryRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/language-availabilities", languageAvailabilityRoutes);
app.use("/api/currency-availabilities", currencyAvailabilityRoutes);
app.use("/api/roles", roleRoutes);
app.use('/api/company-types', companyTypeRoutes);
app.use('/api/company-user-types', companyUserTypeRoutes);
app.use('/api/company-departments', companyDepartmentRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/measure-units', measureUnitRoutes);
app.use('/api/package-units', packageUnitRoutes);
app.use('/api/taxes', taxRoutes);
app.use('/api/charges', chargeRoutes); // <-- Register route
app.use('/api/payment-modes', paymentModeRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/package-module-permissions', packageModulePermissionRoutes);
app.use('/api/suppliers', supplierRoutes);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
