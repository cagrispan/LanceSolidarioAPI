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

module.exports = sequelize.define('products', {
    productId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userId:{
        type: Sequelize.STRING,
        references: {model: 'users', key: 'facebookId'}
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    isUsed: {
        type: Sequelize.BOOLEAN
    },
    isDeleted: {
        type: Sequelize.BOOLEAN
    },
    isSold: {
        type: Sequelize.BOOLEAN
    },
    isDelivered: {
        type: Sequelize.BOOLEAN
    }
});

