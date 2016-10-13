'use strict';
var jqueueService = require('../services/jqueue.service');

function add(req, res) {

    var log = req.log;
    log.child({module: 'pagseguro-webhook-controller'});
    log.info('receiving webhook');
    var message = {
        code : req.notification.code,
        type : req.notification.type
    };
    return res.send(200, message);

}

module.exports.add = add;
