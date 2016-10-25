'use strict';
const bunyan = require('bunyan');
const Elasticsearch = require('bunyan-elasticsearch');

var esStream = new Elasticsearch({
    "indexPattern": "[logstash-]YYYY.MM.DD",
    "type": "logs",
    "host": "189.84.131.212:9200"
});

esStream.on('error', function (err) {
    console.log('Elasticsearch Stream Error:', err.stack);
});

module.exports = bunyan.createLogger({
    name: 'transaction-update',
    level: 10,
    streams: [
        { stream: process.stdout },
        { stream: esStream }
    ],
    serializers: bunyan.stdSerializers
});