'use strict';
var req = require('request-promise');
var pagseguroConfig = require('../config/pagseguro.config');
var fs = require('fs');
var xml2js = require('xml2js');
var POST = 'POST';
var GET = 'GET';

function generateOptions(methodType, url, bodyRequest) {
    return {
        method: methodType,
        uri: url,
        headers: {
            'Content-Type': 'application/xml'
        },
        body: bodyRequest
    }
}

function getPreApproval(code) {
    return req(generateOptions(GET, pagseguroConfig.url.verifyRequest + code + pagseguroConfig.url.authentication));
}

function getTransaction(code) {
    return req(generateOptions(GET, pagseguroConfig.url.verifyTransaction + code + pagseguroConfig.url.authentication));
}

function cancelSubscription(code) {
    return req(generateOptions(GET, pagseguroConfig.url.cancelSubscription + code + pagseguroConfig.url.authentication));
}

function createPreApprovalRequest(preApprovalRequestModel) {
    var builder = new xml2js.Builder({rootName: 'preApprovalRequest'});
    var preApprovalXML = builder.buildObject(preApprovalRequestModel);
    return req(generateOptions(POST, pagseguroConfig.url.createPreRequest, preApprovalXML));
}

function createPaymentRequest(paymentModel) {
    var builder = new xml2js.Builder({rootName: 'checkout'});
    var prePaymentXML = builder.buildObject(paymentModel);
    return req(generateOptions(POST, pagseguroConfig.url.createPaymentRequest, prePaymentXML));
}

function getSubscriptionsByDayInterval(daysInterval) {
    return req(generateOptions(GET, pagseguroConfig.url.querySubscriptionByDays + daysInterval));
}

function getTransactionsBetweenDates(initialDate, finalDate, page, maxPageResults){
    var url = pagseguroConfig.url.queryTransactionsBetweenDates;
    url += '&initialDate=' + initialDate;
    url += '&finalDate=' + finalDate;
    url += '&page=' + page;
    url += '&maxPageResults=' + maxPageResults;
    return req(generateOptions(GET, url));
}

exports.createPreApprovalRequest = createPreApprovalRequest;
exports.getPreApproval = getPreApproval;
exports.cancelSubscription = cancelSubscription;
exports.getTransaction = getTransaction;
exports.createPaymentRequest = createPaymentRequest;
exports.getSubscriptionsByDayInterval = getSubscriptionsByDayInterval;
exports.getTransactionsBetweenDates = getTransactionsBetweenDates;