'use strict';

var Sequelize = require('sequelize');
var config = require('../../config/env.config.js');
var sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    {
        host: config.db.hostdb,
        dialect: config.db.dialect,
        logging: config.db.logging
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
        type: Sequelize.INTEGER,
        references: {model: 'auctions', key: 'auctionId'}
    },
    productId: {
        type: Sequelize.INTEGER,
        references: {model: 'products', key: 'productId'}
    },
    userId: {
        type: Sequelize.STRING,
        references: {model: 'users', key: 'facebookId'}
    },
    redirectUrl: {
        type: Sequelize.STRING
    },
    reviewUrl: {
        type: Sequelize.STRING
    },
    reference: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
    },
    currency: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    },
    url: {
        type: Sequelize.STRING
    },
    isPaid: {
        type: Sequelize.BOOLEAN
    },
    isDelivered: {
        type: Sequelize.BOOLEAN
    }
});

