'use strict';
var json = {
    "jqueueMicroservice": {
        "filters": "filter",
        "queueConnection": {
            "host": "localhost",
            "user": "root",
            "password": "admin",
            "database": "jqueue",
            "limit": 10
        },
        "inputQueue": "notification_code",
        "outputQueue": "",
        "touchTime": 1000,
        "transientErrorDelay": 60
    }
};
module.exports = json;
