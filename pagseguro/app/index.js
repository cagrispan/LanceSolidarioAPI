'use strict';

var restify = require('restify'),
    server = restify.createServer();
server.use(restify.bodyParser({overrideParams: true}));
server.use(restify.queryParser());


var config = require('./config/env.config.js');
require('./config/routes.config.js')(server);


// var res = request('GET', 'http://configuration:9999/configurations/XRVTBYUIJK');
try{
    // var bodyResponse = res.getBody().toString();
    // globalConfiguration.subscriptionDAOConfiguration = JSON.parse(bodyResponse).subscriptionConnection;
    server.listen(config.port, '::', function () {
        console.log('%s listening at %s', server.name, server.url);
    });
}catch(e){
    console.log(e);
}


