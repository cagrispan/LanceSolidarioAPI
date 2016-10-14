'use strict';
var globalConf = require('./config/env.config');
var env = process.env;

env.filters = globalConf.jqueueMicroservice.filters;
env.jqueueHost = globalConf.jqueueMicroservice.queueConnection.host;
env.jqueueUser = globalConf.jqueueMicroservice.queueConnection.user;
env.jqueuePassword = globalConf.jqueueMicroservice.queueConnection.password;
env.jqueueDatabase = globalConf.jqueueMicroservice.queueConnection.database;
env.jqueueLimit = globalConf.jqueueMicroservice.queueConnection.limit;
env.inputQueue = globalConf.jqueueMicroservice.inputQueue;
env.outputQueue = globalConf.jqueueMicroservice.outputQueue;
env.touchTime = globalConf.jqueueMicroservice.touchTime;
env.transientErrorDelay = globalConf.jqueueMicroservice.transientErrorDelay;
env.baseDir = __dirname;

require('@tunts/jqueue-microservice')();