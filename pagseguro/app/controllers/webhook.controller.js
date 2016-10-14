'use strict';
var jqueueService = require('../services/jqueue.service');

function add(req, res) {

    var message = {
        code : req.notification.code,
        type : req.notification.type
    };
    return jqueueService.sendMessageToQueue(JSON.stringify(message))
        .then(function (message){
            return res.send(200, message);
        }, function(e){
            return res.send(500);
        });

}

module.exports.add = add;
