'use strict';

var pagseguroService = require('../services/pagseguro.service'),
    parseString = require('xml2js').parseString,
    pagseguroSetup = require('../config/pagseguro.config');


function add(req, res) {
    var log = req.log;
    log.child({module: 'pagseguro-payment-add-controller'});
    log.info('Creating payment request');
    return pagseguroService.createPaymentRequest(req.payment)
        .then(function (body) {
            log.info('Parsing payment request response');
            parseString(body, function (err, result) {
                try {
                    log.info('Payment request parsed');
                    var code = JSON.parse(JSON.stringify(result)).checkout.code[0];
                    log.trace(code);
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
