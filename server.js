// Express server entry point
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Route imports
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const countryRoutes = require("./src/routes/countryRoutes");
const stateRoutes = require("./src/routes/stateRoutes");
const cityRoutes = require("./src/routes/cityRoutes");
const productRoutes = require("./src/routes/productRoutes");
const salesRoutes = require("./src/routes/salesRoutes");
const rmaRoutes = require("./src/routes/rmaRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to Inventory Management API!');
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/returns", rmaRoutes);
app.use("/api/notifications", notificationRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
