'use strict';
var envConfig = require('../config/env.config');
var mysql = require('mysql');

module.exports = mysql.createPool(envConfig.paymentConnection);