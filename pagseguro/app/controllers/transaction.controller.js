'use strict';
var pagseguroService = require('../services/pagseguro.service'),
    parseString = require('xml2js').parseString,
    sanitizeService = require('../services/sanitize.service');


function findByCode(req, res) {
    pagseguroService.getTransaction(req.params.code)
        .then(function (body) {
            parseString(body, {explicitArray: false}, function (err, result) {
                try {
                    var transactionData = JSON.parse(JSON.stringify(result)).transaction;
                    return res.send(200, sanitizeService.sanitizeTransaction(transactionData));
                } catch (e) {
                    return res.send(500, JSON.parse(JSON.stringify(e.message)));
                }
            });
        }, function (err) {
            return res.send(500, err);
        })
}

function getTransactions(req, res) {
    return pagseguroService.getTransactionsBetweenDates(req.query.initialDate, req.query.finalDate, req.query.page, req.query.maxPageResults)
        .then(function (body) {
                parseString(body, function (err, result) {
                    try {
                        var code = JSON.parse(JSON.stringify(result));
                        return res.send(200, code);
                    } catch (e) {
                        return res.send(500, JSON.parse(JSON.stringify(e.message)));
                    }
                });
            }, function (err) {
                return res.send(500, err);
            }
        );
}

module.exports.findByCode = findByCode;
module.exports.getTransactions = getTransactions;
