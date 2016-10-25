'use strict';
var restify = require('restify'),
    TransactionController = require('../controllers/transaction.controller'),
    WebhookController = require('../controllers/webhook.controller'),
    PaymentController = require('../controllers/payment.controller'),
    uriDecoder = require('../middlewares/url.decoder.middleware');

var PaymentAddValidationMiddleware = require('../middlewares/validations/payment.add.validation.middleware'),
    PaymentParserMiddleware = require('../middlewares/parsers/payment.parser.middleware');

module.exports = function (server) {
    server.use(restify.fullResponse());

    server.post('/webhooks', [
        uriDecoder.decodeUriToNotificationObject,
        WebhookController.add]);

    server.get('/transactions/:code', TransactionController.findByCode);

    server.get('/transactions', [
        TransactionController.getTransactions
    ]);

    server.post('/payments', [
        PaymentAddValidationMiddleware.hasRequiredPaymentAddFields,
        PaymentParserMiddleware.parsePayment,
        PaymentController.add]);

};
