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

module.exports = sequelize.define('auctions', {
    auctionId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    productId:{
        type: Sequelize.INTEGER,
        references: {model: 'products', key: 'productId'}
    },
    institutionId: {
        type: Sequelize.INTEGER,
        references: {model: 'institutions', key: 'institutionId'}
    },
    userId: {
        type: Sequelize.STRING,
        references: {model: 'users', key: 'facebookId'}
    },
    minimumBid : {
        type: Sequelize.DOUBLE
    },
    startDate: {
        type: Sequelize.TIME
    },
    endDate: {
        type: Sequelize.TIME
    },
    isCanceled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

