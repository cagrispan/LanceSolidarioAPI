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

module.exports = sequelize.define('institutions', {
    institutionId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    about: {
        type: Sequelize.STRING
    },
    responsible: {
        type: Sequelize.STRING
    },
    telephone: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    }
});

