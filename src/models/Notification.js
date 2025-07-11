const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Notification = sequelize.define('Notification', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    created_by: { type: DataTypes.INTEGER, allowNull: false },
    notification_type: { type: DataTypes.ENUM('email', 'sms', 'whatsapp'), allowNull: false },
    status: { type: DataTypes.ENUM('sent', 'pending', 'failed'), defaultValue: 'pending' }
}, { timestamps: true });

// Define Relationship
Notification.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Notification;
