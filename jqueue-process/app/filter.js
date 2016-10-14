var typeStatus = require('./config/type.config'),
    apiCommunication = require('./services/api.communication.service'),
    uuid = require('uuid'),
    Client = require('node-rest-client').Client;


exports.filter = function (message) {
    console.log('EGAEHAUHEAUHEUAHUEAH', message);

    if (message.type === 'TRANSACTION' && message.code) {
        var client = new Client();
        var url = "https://ws.pagseguro.uol.com.br/v3/transactions/notifications/" + message.code +
            "?email=brunofaczz2@gmail.com&token=29526020DF0F4B40BA9FA9284D75A1A2";
        client.get(url, function (data, response) {
            // parsed response body as js object
            console.log('EAUHEAUHEAUHEUAHUEAH', data);
            client.get("http://localhost:7780/purchases/" + data.reference, function (data) {
                var purchase = data;
                purchase.status = typeStatus[data.status];

                var args = {
                    data: purchase,
                    headers: {
                        "Content-Type": "application/json",
                        "token": purchase.token
                    }
                };

                client.post("http://localhost:7780/users/" + purchase.userId + "/purchases/" + purchase.purchaseId, args, function (data, response) {
                    console.log('TEORICAMENTE ESTÁ ACABADO');

                });
            });
        });

    }
    // var amount = 0;
    // if ((message.type === 'transaction' && message.status === typeStatus.transaction.status.PAID)) {
    //     amount = message.amount;
    // }
    //
    // if (amount > 0) {
    //     console.log(message)
    //     // var username = message.reference.split('_')[0];
    //     // return apiCommunication.getCustomerByUsername(username, log)
    //     //     .then(function (res) {
    //     //         var customerId = res.data[0].id;
    //     //         var body = {
    //     //             "target_type": "customer",
    //     //             "source_type": "pagseguro",
    //     //             "source_id": message.code,
    //     //             "amount": amount
    //     //         };
    //     //         return apiCommunication.createTransaction(customerId, body, log);
    //     //     }, function (er) {
    //     //         throw 'PersistentException';
    //     //     })
    // }

};
