'use strict';

var globalConf = require('./env.config');

var sandbox = globalConf.pagseguroConf.env !== 'prod' ? 'sandbox.' : '';
var sandboxPath = globalConf.pagseguroConf.env !== 'prod' ? 'sandbox/' : '';
var email = globalConf.pagseguroConf.email;
var token = globalConf.pagseguroConf.token;

var authentication = "?email=" + email + "&token=" + token;

module.exports = {
    "url": {
        "createPreRequest": "https://ws." + sandbox + "pagseguro.uol.com.br/v2/pre-approvals/request" + authentication,
        "redirectPreRequest": "https://" + sandbox + "pagseguro.uol.com.br/v2/pre-approvals/request.html?code=",
        "verifyRequest": "https://ws." + sandbox + "pagseguro.uol.com.br/v2/pre-approvals/",
        "verifyTransaction": "https://ws." + sandbox + "pagseguro.uol.com.br/v2/transactions/",
        "cancelSubscription": "https://ws." + sandbox + "pagseguro.uol.com.br/v2/pre-approvals/cancel/",
        "createPaymentRequest": "https://ws." + sandbox + "pagseguro.uol.com.br/v2/checkout" + authentication,
        "redirectPayment": "https://" + sandbox + "pagseguro.uol.com.br/v2/checkout/payment.html?code=",
        "querySubscriptionByDays": "https://ws." + sandbox + "pagseguro.uol.com.br/v2/pre-approvals/notifications" + authentication + "&interval=",
        "queryTransactionsBetweenDates": "https://ws." + sandbox + "pagseguro.uol.com.br/v2/transactions" + authentication,
        "authentication": authentication
    },
    "type": {
        "PRE_APPROVAL": "preApproval",
        "TRANSACTION": "transaction"
    },
    "transaction": {
        "status": {
            "1": "PENDING",
            "2": "IN_ANALYSIS",
            "3": "PAID",
            "4": "AVAILABLE",
            "5": "IN_DISPUTE",
            "6": "RETURNED",
            "7": "CANCELED"
        }
    }
};
