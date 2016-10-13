var jqueue = require('../config/jqueue.config');
var Q = require('q');

function sendMessageToQueue(messageData, log) {
    log.info('Inserting messageDate into jqueue');
    log.debug(messageData);
    return jqueue.getQueue()
        .then(function (data) {
            var queue = data[0];
            var def = Q.defer();
            queue.put(messageData, function (error, messageId) {
                if (!error) {
                    log.trace('message is nice and pretty');
                    def.resolve(messageId);
                } else {
                    log.error('Error in jqueue');
                    log.debug(error, 'Error inserting into jqueue');
                    def.reject(error);
                }
            });
            return def.promise;
        })
}

module.exports.sendMessageToQueue = sendMessageToQueue;




