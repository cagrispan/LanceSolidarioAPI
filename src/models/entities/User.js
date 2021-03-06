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

module.exports = sequelize.define('user', {
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    facebookId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    facebookToken: {
        type: Sequelize.STRING,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    birthday: {
        type: Sequelize.DATE
    },
    profilePicture: {
        type: Sequelize.STRING
    }
});

