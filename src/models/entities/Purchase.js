'use strict';

var Sequelize = require('sequelize');
var config = require('../../config/env.config.js');
var sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    {
        host: config.db.hostdb,
        dialect: config.db.dialect
    }
);

module.exports = sequelize.define('purchases', {
    purchaseId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    auctionId:{
        type: Sequelize.INTEGER
    },
    productId: {
        type: Sequelize.INTEGER
    },
    paymentId: {
        type: Sequelize.INTEGER
    },
    deliveryId: {
        type: Sequelize.INTEGER
    },
    userId: {
        type: Sequelize.STRING
    },
    redirectUrl: {
        type: Sequelize.STRING
    },
    reviewUrl: {
        type: Sequelize.STRING
    },
    reference: {
        type: Sequelize.STRING
    },
    currency: {
        type: Sequelize.STRING
    }

});

