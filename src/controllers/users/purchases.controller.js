'use strict';
var PurchaseFacade = require('../../models/facades/PurchasesFacade');
var Client = require('node-rest-client').Client;
var BidsFacade = require('../../models/facades/BidsFacade');
var ProductsFacade = require('../../models/facades/ProductsFacade');
var uuid = require('uuid');
var UsersFacade = require('../../models/facades/UsersFacade');
var q = require('q');
var AddressFacade = require('../../models/facades/AddressesFacade');
var TelephoneFacade = require('../../models/facades/TelephonesFacade');
var EmailFacade = require('../../models/facades/EmailsFacade');

function PurchasesController() {

    this.getOne = function (req, res) {
        var purchase = {};
        return PurchaseFacade.readOne(req.params.purchaseId)
            .then(function (result) {
                if (!result) {
                    return res.send(404, purchase);
                }
                purchase = {
                    "purchaseId": result.dataValues.purchaseId,
                    "auctionId": result.dataValues.auctionId,
                    "productId": result.dataValues.productId,
                    "reference": result.dataValues.reference,
                    "status": result.dataValues.status,
                    "url": result.dataValues.url,
                    "facebokId": result.dataValues.userId,
                    "isDelivered": result.dataValues.isDelivered,
                    "productTitle": "",
                    "maxBid": 0,
                    "isPaid": result.dataValues.isPaid
                };

                purchase.isCanceled = result.status === "CANCELED";

                return BidsFacade.readMax(purchase.auctionId);
            }).then(function (bid) {
                purchase.maxBid = bid;
                return ProductsFacade.readOne(purchase.productId);
            }).then(function (product) {
                purchase.productTitle = product.dataValues.title;
                return res.send(200, purchase);
            });
    };

    this.getDonor = function (req, res) {
        var user = {};
        UsersFacade.findOne(req.params.donorsId)
            .then(function (result) {
                if (result) {
                    user = result.dataValues;
                    delete user.createdAt;
                    delete user.updatedAt;
                    delete user.userId;
                    delete user.token;
                    delete user.birthday;
                    delete user.facebookToken;
                    delete user.facebookId;

                    return AddressFacade.readAll(req.params.donorsId);
                }
            })
            .then(function (result) {
                var address;
                if (result) {
                    address = result[0].dataValues;
                    delete address.createdAt;
                    delete address.updatedAt;
                    delete address.addressId;
                    delete address.neighborhood;
                    delete address.complement;
                    delete address.number;
                    delete address.userId;
                    delete address.street;

                    user.address = address;
                }

                return EmailFacade.readAll(req.params.donorsId);
            })
            .then(function (result) {
                if (result.length) {
                    var emails = [];

                    for (var i in result) {
                        emails.push(result[i].dataValues.email);
                    }

                    user.emails = emails;
                }
                return TelephoneFacade.readAll(req.params.donorsId);
            }).then(function (result) {
            if (result.length) {
                var telephones = [];

                for (var i in result) {
                    telephones.push(result[i].dataValues.telephone);
                }

                user.telephones = telephones;
            }

            return res.send(200, user);
        });


    };

    this.getByAuction = function (req, res) {
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
                                if (product.dataValues) {
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

                    if (result) {

                        for (var i = 0; i < result.length; i++) {

                            delete result[i].dataValues.userId;
                            delete result[i].dataValues.createdAt;
                            delete result[i].dataValues.updatedAt;
                            delete result[i].dataValues.paymentId;
                            delete result[i].dataValues.redirectUrl;
                            delete result[i].dataValues.reviewUrl;
                            delete result[i].dataValues.currency;
                            delete result[i].dataValues.deliveryId;

                            result[i].dataValues.isCanceled = result[i].dataValues.status === "CANCELED";

                            bidsPromises[i] = BidsFacade.readMax(result[i].dataValues.auctionId)
                                .then(function (bid) {
                                    if (bid) {
                                        return bid;
                                    }
                                });

                            productsPromises[i] = ProductsFacade.readOne(result[i].dataValues.productId)
                                .then(function (product) {
                                    if (product.dataValues) {
                                        return product.dataValues;
                                    }
                                });

                            response.purchases.push(result[i].dataValues);
                        }
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
                    postObject.items[0].description = "Leilão vencido no lance solidário.";

                    client.post("http://localhost:7811/payments", args, function (data, response) {
                        purchase.url = data.url;
                        if (purchase.url) {
                            return PurchaseFacade.create(purchase)
                                .then(function (result) {
                                    return res.send(201, {
                                        purchaseId: result.dataValues.purchaseId,
                                        url: data.url
                                    });
                                }, function (err) {
                                    return res.send(500, {message: err});
                                });
                        } else {
                            return res.send(500, {message: "pagseguro service is broken"});
                        }

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
                delete purchase.createdAt;
                delete purchase.updatedAt;
                delete purchase.currency;

                return res.send(200, purchase);
            }, function (err) {
                return res.send(500, {message: err});
            })


    };

}

PurchasesController.constructor = PurchasesController;
module.exports = PurchasesController;



