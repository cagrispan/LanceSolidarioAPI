'use strict';
var mysql = require('mysql');
var Client = require('node-rest-client').Client;
var jwt = require('jsonwebtoken');
var sendEmail = require('./services/email.service');
var config = require('../app/config/env.config');

console.log('Start auction-end task, running each %s second(s)',config.taskTimeout/1000);
setInterval(function() {
    var con = mysql.createConnection(config.dbConfig);

    let date = new Date();
    date = date.getFullYear() + "-"+ ("0" + (date.getMonth() + 1)).slice(-2) +"-" + ("0" + date.getDate()).slice(-2) +" " + ("0" + date.getHours()).slice(-2)+":" + ("0" + date.getMinutes()).slice(-2);;

    let query = 'SELECT * FROM auctions WHERE endDate LIKE \"' + date + '%\"';

    var client = new Client();
    var token = jwt.sign({id: 'auction-end'}, 'banana', {algorithm: 'HS256'});


    con.query(query,function(err,rows){
        if(err) throw err;

        for(var i in rows) {
            let postObject = {
                "redirectUrl": "to fix",
                "reviewUrl": "to fix",
                "productId": rows[i].productId,
                "auctionId": rows[i].auctionId
            };

            let args = {
                data: postObject,
                headers: {"Content-Type": "application/json",
                    "token" : token}
            };

            if(!rows[i].isCanceled){
                client.get("http://localhost:7780/auctions/"+rows[i].auctionId+"/bids", args, function(data) {
                    var bids = data.bids;
                    var maxBid;
                    for(var i in bids) {
                        if(i == 0) {
                            maxBid = bids[i];
                        } else if(bids[i].bid > maxBid.bid) {
                            maxBid = bids[i];
                        }

                    }

                    if(maxBid) {
                        client.post("http://localhost:7780/users/"+maxBid.userId+"/purchases", args, function (data, response) {
                            var linkToPay = data.url;

                            delete args.data;
                            client.get("http://localhost:7780/users/"+maxBid.userId+"/emails", args, function(data) {

                                if(data.emails.length) {
                                    var receiver = data.emails[0].email;
                                    var subject = 'Você ganhou o leilão!';
                                    var text = 'Parabéns, você ganhou o leilão. Link para pagar: ' + linkToPay;
                                    sendEmail(receiver, subject, text, function(err) {
                                        if(err) {
                                            console.log(err);
                                        }
                                    });
                                }
                            });

                        });
                    }

                });
            }
        }
    });
}, config.taskTimeout);

