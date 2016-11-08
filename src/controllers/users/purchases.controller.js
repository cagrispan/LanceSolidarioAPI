'use strict';
var PurchaseFacade = require('../../models/facades/PurchasesFacade');
var Client = require('node-rest-client').Client;
var BidsFacade = require('../../models/facades/BidsFacade');
var ProductsFacade = require('../../models/facades/ProductsFacade');
var uuid = require('uuid');
var UsersFacade = require('../../models/facades/UsersFacade');
var q = require('q');

function PurchasesController() {

    this.getOne = function (req, res) {
        var purchase = {};
        return PurchaseFacade.readOne(req.params.purchaseId)
            .then(function(result) {
                console.log(result.dataValues);
                purchase = {
                    "purchaseId": result.purchaseId,
                    "auctionId": result.dataValues.auctionId,
                    "productId": result.dataValues.productId,
                    "reference": result.dataValues.reference,
                    "status": result.dataValues.status,
                    "url": result.dataValues.url,
                    "productTitle": "",
                    "maxBid": 0
                };

                return BidsFacade.readMax(purchase.auctionId);
            }).then(function(bid) {
                purchase.maxBid = bid;
                return ProductsFacade.readOne(purchase.productId);
            }).then(function(product) {
                purchase.productTitle = product.dataValues.title;
                return res.send(200, purchase);
            });
    };

    this.getByAuction = function(req, res) {
        var purchase = {};

        purchase.auctionId = req.params.auctionId;

        return PurchaseFacade.getByAuction(purchase.auctionId)
            .then(
                function (result) {

                    var response = {};

                    response.purchases = [];
                    response.facebookId = purchase.userId;

                    var bidsPromises = [];
                    var productsPromises = [];

                    for (var i = 0; i < result.length; i++) {

                        delete result[i].dataValues.userId;
                        delete result[i].dataValues.createdAt;
                        delete result[i].dataValues.updatedAt;
                        delete result[i].dataValues.paymentId;
                        delete result[i].dataValues.redirectUrl;
                        delete result[i].dataValues.reviewUrl;
                        delete result[i].dataValues.currency;
                        delete result[i].dataValues.deliveryId;

                        bidsPromises[i] = BidsFacade.readMax(result[i].dataValues.auctionId)
                            .then(function (bid) {
                                if (bid) {
                                    return bid;
                                }
                            });

                        productsPromises[i] = ProductsFacade.readOne(result[i].dataValues.productId)
                            .then(function (product) {
                                if(product.dataValues){
                                    return product.dataValues;
                                }
                            });

                        response.purchases.push(result[i].dataValues);
                    }

                    q.all(productsPromises).done(function () {
                        q.all(bidsPromises).done(function () {

                            for (i = 0; i < response.purchases.length; i++) {
                                response.purchases[i].productTitle = productsPromises[i].title;
                                response.purchases[i].maxBid = bidsPromises[i];
                            }

                            return res.send(200, response);
                        });

                    });

                },
                function (err) {
                    return res.send(500, err);
                });
    }

    this.getAll = function (req, res) {

        var purchase = {};

        purchase.userId = req.params.facebookId;

        return PurchaseFacade.readAll(purchase.userId)
            .then(
                function (result) {

                    var response = {};

                    response.purchases = [];
                    response.facebookId = purchase.userId;

                    var bidsPromises = [];
                    var productsPromises = [];

                    for (var i = 0; i < result.length; i++) {

                        delete result[i].dataValues.userId;
                        delete result[i].dataValues.createdAt;
                        delete result[i].dataValues.updatedAt;
                        delete result[i].dataValues.paymentId;
                        delete result[i].dataValues.redirectUrl;
                        delete result[i].dataValues.reviewUrl;
                        delete result[i].dataValues.currency;
                        delete result[i].dataValues.deliveryId;

                        bidsPromises[i] = BidsFacade.readMax(result[i].dataValues.auctionId)
                            .then(function (bid) {
                                if (bid) {
                                    return bid;
                                }
                            });

                        productsPromises[i] = ProductsFacade.readOne(result[i].dataValues.productId)
                            .then(function (product) {
                                if(product.dataValues){
                                    return product.dataValues;
                                }
                            });

                        response.purchases.push(result[i].dataValues);
                    }

                    q.all(productsPromises).done(function () {
                        q.all(bidsPromises).done(function () {

                            for (i = 0; i < response.purchases.length; i++) {
                                response.purchases[i].productTitle = productsPromises[i].title;
                                response.purchases[i].maxBid = bidsPromises[i];
                            }

                            return res.send(200, response);
                        });

                    });

                },
                function (err) {
                    return res.send(500, err);
                });

    };

    this.add = function (req, res) {

        var purchase = req.body;
        purchase.userId = req.params.facebookId;
        purchase.status = "PENDING";
        purchase.reference = uuid.v1();

        let postObject = {
            "redirectUrl": req.body.redirectUrl,
            "reviewUrl": req.body.reviewUrl,
            "reference": purchase.reference,
            "currency": "BRL",
            "items": [{
                "id": req.body.productId,
                "amount": "",
                "description": "",
                "quantity": 1
            }]
        };

        var client = new Client();

        var args = {
            data: postObject,
            headers: {"Content-Type": "application/json"}
        };

        BidsFacade.readMax(req.body.auctionId).then(resolution => {

            if (resolution) {
                postObject.items[0].amount = resolution.toFixed(2);

                return ProductsFacade.readOne(postObject.items[0].id).then(resolution => {
                    postObject.items[0].description = resolution.dataValues.description;

                    client.post("http://localhost:7811/payments", args, function (data, response) {
                        purchase.url = data.url;
                        return PurchaseFacade.create(purchase)
                            .then(function (result) {
                                return res.send(201, {
                                    purchaseId: result.dataValues.purchaseId,
                                    url: data.url
                                });
                            }, function (err) {
                                return res.send(500, {message: err});
                            });
                    });


                });
            } else {
                return res.send(401, {message: "Auction without bids."});
            }


        });


    };

    this.update = function (req, res) {

        var purchase = req.body;
        purchase.userId = req.params.facebookId;
        purchase.purchaseId = req.params.purchaseId;

        return PurchaseFacade.update(purchase)
            .spread(function () {
                return res.send(204);
            }, function (err) {
                return res.send(500, {message: err});
            });

    };

    this.getByReference = function (req, res) {
        var reference = req.params.reference;

        return PurchaseFacade.getByReference(reference)
            .then((resolution) => {
                var purchase = resolution.dataValues;
                UsersFacade.findOne(purchase.userId).then((resolution) => {
                    purchase.token = resolution.dataValues.token;
                    return res.send(200, purchase);
                });
            }, function (err) {
                return res.send(500, {message: err});
            })


    }

}

PurchasesController.constructor = PurchasesController;
module.exports = PurchasesController;



