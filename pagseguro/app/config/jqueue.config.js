// var Jqueue = require('jqueue');
// var db = require('node-mysql');
// var Q = require('q');
//
//
// var globalConf = require('./env.config');
//
// var conncetionInfo = {
//     host: globalConf.jqueueMicroservice.queueConnection.host,
//     user: globalConf.jqueueMicroservice.queueConnection.user,
//     password: globalConf.jqueueMicroservice.queueConnection.password,
//     database: globalConf.jqueueMicroservice.queueConnection.database
// };
// var dataSource = new db.DB(conncetionInfo);
// var jqueue = new Jqueue(dataSource);
// var jqueueUse = Q.denodeify(jqueue.use);
//
// function getQueue(){
//     return jqueueUse('notification_code');
// }
//
// function getJQueue() {
//     return jqueue;
// }
//
// module.exports.getJQueue = getJQueue;
// module.exports.getQueue = getQueue;
