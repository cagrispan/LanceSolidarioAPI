'use strict';
var globalConf = require('../config/env.config');
var req = require('request-promise');

function generateOptions(methodType, url, bodyRequest) {
    return {
        method: methodType,
        uri: url,
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyRequest,
        json:true
    }
}

function createTransaction(customerId, body, log){
    log = log.child({module: 'transaction-update-api-communication'});
    var url = globalConf.customers.urls.postTransaction.replace('{customer_id}', customerId);
    log.info('creating transaction with url: ' + url);
    return req(generateOptions('POST', url, body));
}

function getCustomerByUsername(userId, log){
    log = log.child({module: 'transaction-update-api-communication'});
    var url = globalConf.customers.urls.getByExternalID + userId;
    log.info('getting customer with url: ' + url);
    return req(generateOptions('GET', url));
}

module.exports.getCustomerByUsername = getCustomerByUsername;
module.exports.createTransaction = createTransaction;
