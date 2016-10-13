'use strict';

var pagseguroService = require('../services/pagseguro.service'),
    parseString = require('xml2js').parseString,
    pagseguroSetup = require('../config/pagseguro.config');

function helloWorld(req, res) {
    return res.send(200, {message: "Hello World"});
}


function getSubscriptions(req, res) {
    var log = req.log;
    log.child({module: 'pagseguro-subcription-get-controller'});
    log.info('Searching for subscriptions');
    if (req.query.daysInterval) {
        return pagseguroService.getSubscriptionsByDayInterval(req.query.daysInterval)
            .then(function (body) {
                    parseString(body, function (err, result) {
                        try {
                            log.info('Finished searching subscriptions');
                            var code = JSON.parse(JSON.stringify(result));
                            return res.send(200, code);
                        } catch (e) {
                            log.error('Error while parsing subscriptions search request');
                            log.debug(e, 'Error while parsing subscriptions search request');
                            return res.send(500, JSON.parse(JSON.stringify(e.message)));
                        }
                    });
                }, function (err) {
                    log.error('Unknown error while getting subscription list');
                    log.debug(err, 'Unknown error while getting subscription list');
                    return res.send(500, err);
                }
            );
    } else {
        return res.send(404);
    }
}

function add(req, res) {
    var log = req.log;
    log.child({module: 'pagseguro-subcription-add-controller'});
    log.info('Generating request to create subscription (preApproval)');
    pagseguroService.createPreApprovalRequest(req.subscription)
        .then(function (body) {
                parseString(body, function (err, result) {
                    try {
                        var code = JSON.parse(JSON.stringify(result)).preApprovalRequest.code[0];
                        log.info('Request for subscription created with code: ', code);
                        return res.send(201, {url: pagseguroSetup.url.redirectPreRequest + code});
                    } catch (e) {
                        log.error('Error while generating preApproval');
                        log.debug(e, 'Error generating preApproval');
                        return res.send(500, JSON.parse(JSON.stringify(e.message)));
                    }
                });
            }, function (err) {
                log.error('Error while generating preApproval');
                log.debug(err, 'Error generating preApproval');
                return res.send(500, err);
            }
        );
}

function findByCode(req, res) {
    var log = req.log;
    log.child({module: 'pagseguro-subcription-find-by-code-controller'});
    log.info('Finding subscription by code: ', req.params.code);
    pagseguroService.getPreApproval(req.params.code)
        .then(function (body) {
            parseString(body, {explicitArray: false}, function (err, result) {
                try {
                    log.info('Subscription by code search finished');
                    return res.send(200, JSON.parse(JSON.stringify(result)).preApproval);
                } catch (e) {
                    return res.send(500, JSON.parse(JSON.stringify(e.message)));
                }
            });
        }, function (err) {
            return res.send(500, err);
        })
}

function cancelByCode(req, res) {
    var log = req.log;
    log.child({module: 'pagseguro-subcription-delete-controller'});
    pagseguroService.cancelSubscription(req.params.code)
        .then(function (body) {
            parseString(body, function (err, result) {
                try {
                    return res.send(204);
                } catch (e) {
                    return res.send(500, JSON.parse(JSON.stringify(e.message)));
                }
            });
        }, function (err) {
            return res.send(500, err);
        })
}

module.exports.add = add;
module.exports.findByCode = findByCode;
module.exports.cancelByCode = cancelByCode;
module.exports.helloWorld = helloWorld;
module.exports.getSubscriptions = getSubscriptions;
