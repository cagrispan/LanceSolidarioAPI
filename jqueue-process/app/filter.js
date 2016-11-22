var typeStatus = require('./config/type.config'),
    uuid = require('uuid'),
    Q = require('q'),
    Client = require('node-rest-client').Client,
    xml2js = require('xml2js'),
    jwt = require('jsonwebtoken');


var parser = new xml2js.Parser();

exports.filter = function (message) {

    var token = jwt.sign({id: 'jqueue-process'}, 'banana', {algorithm: 'HS256'});

    var deferred = Q.defer();

    if (message.type === 'TRANSACTION' && message.code) {
        var client = new Client();
        var url = "https://ws.sandbox.pagseguro.uol.com.br/v3/transactions/notifications/" + message.code +
            "?email=brunofaczz2@gmail.com&token=29526020DF0F4B40BA9FA9284D75A1A2";
        client.get(url, function (data, response) {
            parser.parseString(data.toString(), (err, data) => {
                if(err) {
                    deferred.reject();
                }

                var status = typeStatus[data.transaction.status[0]];
                console.log(" http://localhost:7780/purchases/" + data.transaction.reference[0]);

                client.get("http://localhost:7780/purchases/" + data.transaction.reference[0], function (data) {
                    var purchase = data;
                    purchase.status = status;

                    if(status === "paid") {
                        purchase.isPaid = true;
                    }

                    var args = {
                        data: purchase,
                        headers: {
                            "Content-Type": "application/json",
                            "token": token
                        }
                    };

                    console.log("http://localhost:7780/users/" + purchase.userId + "/purchases/" + purchase.purchaseId);
                    console.log(purchase);

                    client.put("http://localhost:7780/users/" + purchase.userId + "/purchases/" + purchase.purchaseId, args, function (data, response) {
                        client.get("http://localhost:7780/auctions/" + purchase.auctionId + "/products", function (data) {
                            var product = data.products[0];
                            product.isSold = true;

                            args.data = product;

                            client.put("http://localhost:7780/users/"+product.userId+"/products/"+product.productId, args, function (data, response) {
                                deferred.resolve(true);
                            });
                        });
                    });
                });
            });
        });

    } else {
        if(err) {
            deferred.reject();
        }
    }

    return deferred.promise;
};
