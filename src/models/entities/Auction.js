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
        type: Sequelize.INTEGER
    },
    institutionId: {
        type: Sequelize.INTEGER
    },
    userId: {
        type: Sequelize.STRING
    },
    minimumBid : {
        type: Sequelize.DOUBLE
    },
    startDate: {
        type: Sequelize.DATE
    },
    endDate: {
        type: Sequelize.DATE
    },
    isCanceled: {
        type: Sequelize.BOOLEAN
    }
});

