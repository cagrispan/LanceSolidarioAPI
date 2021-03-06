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

function createPaymentRequest(paymentModel) {
    var builder = new xml2js.Builder({rootName: 'checkout'});
    var prePaymentXML = builder.buildObject(paymentModel);
    return req(generateOptions(POST, pagseguroConfig.url.createPaymentRequest, prePaymentXML));
}

function getTransactionsBetweenDates(initialDate, finalDate, page, maxPageResults){
    var url = pagseguroConfig.url.queryTransactionsBetweenDates;
    url += '&initialDate=' + initialDate;
    url += '&finalDate=' + finalDate;
    url += '&page=' + page;
    url += '&maxPageResults=' + maxPageResults;
    return req(generateOptions(GET, url));
}

exports.getTransaction = getTransaction;
exports.createPaymentRequest = createPaymentRequest;
exports.getTransactionsBetweenDates = getTransactionsBetweenDates;
