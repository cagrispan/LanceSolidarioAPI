'use strict';

var pagseguroService = require('../services/pagseguro.service'),
    parseString = require('xml2js').parseString,
    pagseguroSetup = require('../config/pagseguro.config');


function add(req, res) {
    return pagseguroService.createPaymentRequest(req.payment)
        .then(function (body) {
            parseString(body, function (err, result) {
                try {
                    var code = JSON.parse(JSON.stringify(result)).checkout.code[0];
                    return res.send(201, {url: pagseguroSetup.url.redirectPayment + code});
                } catch (e) {
                    return res.send(500, JSON.parse(JSON.stringify(e.message)));
                }
            });
        }, function (err) {
            return res.send(500, err);
        });
}

module.exports.add = add;
