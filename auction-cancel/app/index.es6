'use strict';
var mysql = require('mysql');
var Client = require('node-rest-client').Client;
var jwt = require('jsonwebtoken');
var config = require('../app/config/env.config');

var pool = mysql.createPool(config.dbConfig);
console.log('Start auction-cancel task, running each %s second(s)', config.taskTimeout / 1000);
setInterval(function () {

    let query = 'SELECT auctions.*,TIMESTAMPDIFF(MINUTE ,now(),auctions.endDate) FROM auctions LEFT JOIN purchases ON auctions.auctionId = purchases.auctionId where purchases.auctionId = auctions.auctionId && auctions.isCanceled = 0 && purchases.status = \'PENDING\' && TIMESTAMPDIFF(MINUTE ,now(),auctions.endDate)<=(-14400)';

    var client = new Client();
    var token = jwt.sign({id: 'auction-end'}, 'banana', {algorithm: 'HS256'});

    pool.query(query, function (err, rows) {
        if (err) throw err;

        for (var i in rows) {
            let auction = rows[i];

            let putObject = {
                "startDate": auction.startDate,
                "endDate": auction.endDate,
                "institutionId": auction.institutionId,
                "productId": auction.productId,
                "minimumBid": auction.minimumBid,
                "isCanceled": true
            };

            let args = {
                data: putObject,
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                }
            };

            if (!auction.isCanceled) {
                client.put(config.path + "/users/" + auction.userId + "/auctions/" + auction.auctionId, args, function () {
                });

                client.get(config.path + "/auctions/" + auction.auctionId + "/purchases", args, function (data) {

                    var purchases = data.purchases;

                    for (var i in purchases) {
                        let purchase = data.purchases[i];

                        if (purchase.auctionId === auction.auctionId) {
                            purchase.status = 'CANCELED';
                            purchase.isPaid = false;

                            putObject = purchase;

                            args = {
                                data: putObject,
                                headers: {
                                    "Content-Type": "application/json",
                                    "token": token
                                }
                            };

                            client.put(config.path + "/users/" + auction.userId + "/purchases/" + purchase.purchaseId, args, function (data) {
                                console.log('Auction ' + auction.auctionId + ' canceled.');
                            });
                        }
                    }
                });
            }
        }
    });

}, config.taskTimeout);

