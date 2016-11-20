'use strict';
var mysql = require('mysql');
var Client = require('node-rest-client').Client;
var jwt = require('jsonwebtoken');
var sendEmail = require('./services/email.service');
var config = require('../app/config/env.config');

console.log('Start auction-end task, running each %s second(s)', config.taskTimeout / 1000);
setInterval(function () {
    var con = mysql.createConnection(config.dbConfig);

    //Magic query, vlw flws \o/
    let query = 'SELECT auctions.* FROM auctions LEFT JOIN purchases ON auctions.auctionId = purchases.auctionId where purchases.auctionId is null && auctions.isCanceled = 0 && TIMESTAMPDIFF(MINUTE,now(),endDate)<0;';
    var client = new Client();
    var token = jwt.sign({id: 'auction-end'}, 'banana', {algorithm: 'HS256'});

    con.query(query, function (err, rows) {

        if (err) console.log(err);

        for (var i in rows) {
            var auction = rows[i];
            let postObject = {
                "redirectUrl": "www.lancesolidario.com.br/user/purchases",
                "reviewUrl": "www.lancesolidario.com.br/user/purchases",
                "productId": auction.productId,
                "auctionId": auction.auctionId
            };

            let args = {
                data: postObject,
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                }
            };

            if (!auction.isCanceled) {
                client.get("http://localhost:7780/auctions/" + auction.auctionId + "/bids", args, function (data) {
                    var bids = data.bids;
                    var maxBid;
                    for (var i in bids) {
                        if (i == 0) {
                            maxBid = bids[i];
                        } else if (bids[i].bid > maxBid.bid) {
                            maxBid = bids[i];
                        }

                    }

                    if (maxBid) {
                        client.post("http://localhost:7780/users/" + maxBid.userId + "/purchases", args, function (data, response) {
                            var linkToPay = data.url;

                            delete args.data;
                            client.get("http://localhost:7780/auctions/"+auction.auctionId+"/products", args, function (data) {
                                var product;
                                if(data.products) {
                                    product = data.products[0];
                                }
                                client.get("http://localhost:7780/users/" + maxBid.userId + "/emails", args, function (data) {

                                    delete args.headers.token;
                                    client.get("http://localhost:7780/users/" + maxBid.userId, args, function (user) {

                                        if (data.emails.length) {
                                            var receiver = data.emails[0].email;
                                            var subject = 'Você ganhou o leilão!';
                                            var html = '<h2>Parabéns ' + user.name.split(' ')[0] + ', você ganhou o leilão do seguinte produto:</h2>' +
                                                '<b><h3>' +
                                                product.title +
                                                '</h3></b>' +
                                                product.description +
                                                '<br />' +
                                                '<br />' +
                                                '<br />' +
                                                'Para pagar, acesse o link ' +
                                                '<br />' + linkToPay +
                                                '<br />' +
                                                '<br />' +
                                                'Lembramos que ao comprar no Lance Solidário, ' +
                                                'o valor pago pelo produto é doado para uma instituição escolhida pelo antigo dono do produto. ' +
                                                'Volte a comprar com a gente e continue ajudando!' +
                                                '<br />' +
                                                '<br />' +
                                                'Doe e participe ativamente de nossa comunidade!' +
                                                '<br />' +
                                                '<br />' +
                                                'Esperamos vê-lo novamente em breve!' +
                                                '<br />' +
                                                '<br />' +
                                                '<br />' +
                                                'Muito obrigado.' +
                                                '<br />' +
                                                '<br /><b>' +
                                                'Equipe Lance Solidário</b>';
                                            sendEmail(receiver, subject, html, function (err) {
                                                if (err) {
                                                    console.log(err);
                                                }
                                            });
                                        }
                                    });
                                });
                            });

                        });
                    }
                });
            }

        }
    });
}, config.taskTimeout);

