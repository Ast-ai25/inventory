const { sequelize } = require("../config/database");
const Return = require("../models/Return");
const RmaReturn = require("../models/RmaReturn");
const Sale = require("../models/Sale");
const Inventory = require("../models/Inventory");
const authMiddleware = require("../middleware/authMiddleware");

// Create new return request
exports.createReturn = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { sale_id, return_reason, items } = req.body;
        const user_id = req.user.id;

        // Create return record
        const returnRecord = await Return.create({
            sale_id,
            return_reason,
            approved_by: user_id
        }, { transaction });

        // Create RMA items
        for (const item of items) {
            await RmaReturn.create({
                return_id: returnRecord.id,
                product_id: item.product_id,
                quantity: item.quantity,
                reason: item.reason
            }, { transaction });
        }

        await transaction.commit();

        // Send notification to admin
        const Notification = require('../models/Notification');
        await Notification.create({
            user_id: 1, // Admin user ID
            message: `New return request (ID: ${returnRecord.id}) for sale ${sale_id}`,
            created_by: req.user.id,
            notification_type: 'email',
            status: 'pending'
        });

        res.status(201).json(returnRecord);
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ message: "Error creating return", error: error.message });
    }
};

// Approve return and process refund
exports.approveReturn = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const returnRecord = await Return.findByPk(req.params.id, { transaction });
        if (!returnRecord) {
            return res.status(404).json({ message: "Return not found" });
        }

        // Update return status
        await returnRecord.update({
            return_status: 'approved',
            approved_by: req.user.id
        }, { transaction });

        // Process refund and update inventory
        const sale = await Sale.findByPk(returnRecord.sale_id, { transaction });
        const rmaItems = await RmaReturn.findAll({
            where: { return_id: returnRecord.id },
            transaction
        });

        let refundAmount = 0;
        for (const item of rmaItems) {
            // Calculate refund amount
            refundAmount += item.quantity * item.unit_price;

            // Restock inventory
            await Inventory.increment('quantity', {
                by: item.quantity,
                where: { product_id: item.product_id, branch_id: sale.branch_id },
                transaction
            });
        }

        // Update refund amount
        await returnRecord.update({
            refund_amount: refundAmount,
            return_status: 'processed',
            processed_by: req.user.id,
            return_date: new Date()
        }, { transaction });

        await transaction.commit();

        // Send notification to customer
        const Notification = require('../models/Notification');
        await Notification.create({
            user_id: returnRecord.sale.customer_id,
            message: `Your return (ID: ${returnRecord.id}) has been processed. Refund amount: ${refundAmount}`,
            created_by: req.user.id,
            notification_type: 'email',
            status: 'pending'
        });

        res.json(returnRecord);
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ message: "Error approving return", error: error.message });
    }
};

// Get all returns
exports.getAllReturns = async (req, res) => {
    try {
        const returns = await Return.findAll({
            include: ['Sale', 'RmaReturns']
        });
        res.json(returns);
    } catch (error) {
        res.status(500).json({ message: "Error fetching returns" });
    }
};

// Get single return
exports.getReturn = async (req, res) => {
    try {
        const returnRecord = await Return.findByPk(req.params.id, {
            include: ['Sale', 'RmaReturns']
        });
        if (!returnRecord) return res.status(404).json({ message: "Return not found" });
        res.json(returnRecord);
    } catch (error) {
        res.status(500).json({ message: "Error fetching return" });
    }
};
