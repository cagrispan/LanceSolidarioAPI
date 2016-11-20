var typeStatus = require('./config/type.config'),
    uuid = require('uuid'),
    Q = require('q'),
    Client = require('node-rest-client').Client,
    xml2js = require('xml2js');

var parser = new xml2js.Parser();

exports.filter = function (message) {

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
                            "token": purchase.token
                        }
                    };

                    client.put("http://localhost:7780/users/" + purchase.userId + "/purchases/" + purchase.purchaseId, args, function (data, response) {
                        deferred.resolve(true);
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
