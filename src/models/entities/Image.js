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

module.exports = sequelize.define('images', {
    imageId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    productId: {
        type: Sequelize.INTEGER
    },
    base64: {
        type: Sequelize.TEXT
    }
});

