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

module.exports = sequelize.define('addresses', {
    addressId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userId:{
        type: Sequelize.STRING
    },
    street: {
        type: Sequelize.STRING
    },
    number: {
        type: Sequelize.STRING
    },
    complement: {
        type: Sequelize.STRING
    },
    neighborhood: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    cep: {
        type: Sequelize.STRING
    }
});

