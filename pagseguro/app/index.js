'use strict';

var restify = require('restify'),
    server = restify.createServer();
server.use(restify.bodyParser({overrideParams: true}));
server.use(restify.queryParser());


var config = require('./config/env.config.js');
require('./config/routes.config.js')(server);


try{
    server.listen(config.port, '::', function () {
        console.log('%s listening at %s', server.name, server.url);
    });
}catch(e){
    console.log(e);
}


