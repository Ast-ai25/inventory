const { sequelize } = require("../config/database");
const Sale = require("../models/Sale");
const SaleItem = require("../models/SaleItem");
const Product = require("../models/Product");
const Inventory = require("../models/Inventory");
const authMiddleware = require("../middleware/authMiddleware");

// Create new sale with items
exports.createSale = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { customer_id, branch_id, items } = req.body;

        // Calculate total
        let total = 0;
        for (const item of items) {
            const product = await Product.findByPk(item.product_id, { transaction });
            total += product.price * item.quantity;
        }

        // Create sale
        const sale = await Sale.create({
            customer_id,
            branch_id,
            total_amount: total,
            payment_status: 'pending'
        }, { transaction });

        // Create sale items and update inventory
        for (const item of items) {
            await SaleItem.create({
                sale_id: sale.id,
                product_id: item.product_id,
                quantity: item.quantity,
                unit_price: item.unit_price
            }, { transaction });

            // Update inventory
            await Inventory.decrement('quantity', {
                by: item.quantity,
                where: { product_id: item.product_id, branch_id },
                transaction
            });
        }

        await transaction.commit();

        // Send notification to admin
        const Notification = require('../models/Notification');
        await Notification.create({
            user_id: 1, // Admin user ID
            message: `New sale created (ID: ${sale.id}) for ${total}`,
            created_by: req.user.id,
            notification_type: 'email',
            status: 'pending'
        });

        res.status(201).json(sale);
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ message: "Error creating sale", error: error.message });
    }
};

// Get all sales
exports.getAllSales = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            include: ['SaleItems', 'Customer', 'Branch']
        });
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: "Error fetching sales" });
    }
};

// Get single sale
exports.getSale = async (req, res) => {
    try {
        const sale = await Sale.findByPk(req.params.id, {
            include: ['SaleItems', 'Customer', 'Branch']
        });
        if (!sale) return res.status(404).json({ message: "Sale not found" });
        res.json(sale);
    } catch (error) {
        res.status(500).json({ message: "Error fetching sale" });
    }
};

// Update sale status
exports.updateSaleStatus = async (req, res) => {
    try {
        const sale = await Sale.findByPk(req.params.id);
        if (!sale) return res.status(404).json({ message: "Sale not found" });

        await sale.update({ payment_status: req.body.status });
        res.json(sale);
    } catch (error) {
        res.status(400).json({ message: "Error updating sale" });
    }
};
