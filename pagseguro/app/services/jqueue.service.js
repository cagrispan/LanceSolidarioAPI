var jqueue = require('../config/jqueue.config');
var Q = require('q');

function sendMessageToQueue(messageData) {
    return jqueue.getQueue()
        .then(function (data) {
            var queue = data[0];
            var def = Q.defer();
            queue.put(messageData, function (error, messageId) {
                if (!error) {
                    def.resolve(messageId);
                } else {
                    def.reject(error);
                }
            });
            return def.promise;
        })
}

module.exports.sendMessageToQueue = sendMessageToQueue;




