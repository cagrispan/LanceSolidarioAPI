'use strict';
var restify = require('restify'),
    SubscriptionController = require('../controllers/subscription.controller'),
    TransactionController = require('../controllers/transaction.controller'),
    WebhookController = require('../controllers/webhook.controller'),
    PaymentController = require('../controllers/payment.controller'),
    uriDecoder = require('../middlewares/url.decoder.middleware');

var SubscriptionAddValidationMiddleware = require('../middlewares/validations/subscription.add.validation.middleware'),
    SubscriptionParserMiddleware = require('../middlewares/parsers/subscription.parser.middleware.js'),
    PaymentAddValidationMiddleware = require('../middlewares/validations/payment.add.validation.middleware'),
    PaymentParserMiddleware = require('../middlewares/parsers/payment.parser.middleware'),
    logBuilderMiddleware = require('../middlewares/log.generator.middleware');

module.exports = function (server) {
    server.use(restify.fullResponse());

    server.get('/', SubscriptionController.helloWorld);

    server.post('/subscriptions', [
        SubscriptionAddValidationMiddleware.hasRequiredSubscriptionAddFields,
        SubscriptionParserMiddleware.parseSubscription,
        SubscriptionController.add]);

    server.get('/subscriptions', [
        SubscriptionController.getSubscriptions
    ]);

    server.get('/subscriptions/:code', SubscriptionController.findByCode);
    server.del('/subscriptions/:code', SubscriptionController.cancelByCode);

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
