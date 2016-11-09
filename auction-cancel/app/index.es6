'use strict';
var mysql = require('mysql');
var Client = require('node-rest-client').Client;
var jwt = require('jsonwebtoken');
var sendEmail = require('./services/email.service');
var config = require('../app/config/env.config');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "lance"
});

setInterval(function () {
    var date = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
    date = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);

    let query = 'SELECT * FROM auctions WHERE endDate LIKE \"' + date + '%\"';

    var client = new Client();
    var token = jwt.sign({id: 'auction-end'}, 'banana', {algorithm: 'HS256'});


    con.query(query, function (err, rows) {
        if (err) throw err;

        for (var i in rows) {
            let auction = rows[i];

            let putObject = {
                "startDate": auction.startDate,
                "endDate": new Date((new Date(auction.endDate).getTime() - (2 * 60 * 60 * 1000))),
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
                            purchase.status = 'canceled';

                            putObject = purchase;

                            args = {
                                data: putObject,
                                headers: {
                                    "Content-Type": "application/json",
                                    "token": token
                                }
                            };

                            client.put(config.path + "/users/" + auction.auctionId + "/purchases/" + purchase.purchaseId, args, function (data) {
                                console.log('Auction '+auction.auctionId+' canceled.');
                            });
                        }
                    }
                });
            }
        }
    });
}, 1000);

