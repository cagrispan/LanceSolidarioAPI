'use strict';
var AuctionFacade = require('../../models/facades/AuctionsFacade');
var ProductFacade = require('../../models/facades/ProductsFacade');
var BidFacade = require('../../models/facades/BidsFacade');
var ImageFacade = require('../../models/facades/ImagesFacade');
var q = require('q');

function AuctionsController() {

    this.getAll = function (req, res) {

        var auction = {};

        auction.userId = req.params.facebookId;

        AuctionFacade.readAll(auction.userId)
            .then(
                function (result) {

                    var response = {};
                    var i;

                    response.auctions = [];

                    if (auction.userId) {

                        response.facebookId = auction.userId;

                        for (i = 0; i < result.length; i++) {

                            auctionStatus(result[i].dataValues);

                            delete result[i].dataValues.userId;
                            delete result[i].dataValues.createdAt;
                            delete result[i].dataValues.updatedAt;

                            response.auctions.push(result[i].dataValues);
                        }

                        return res.send(200, response);

                    } else {

                        var imagePromises = [];
                        var bidPromises = [];

                        for (i = 0; i < result.length; i++) {

                            auctionStatus(result[i].dataValues);

                            delete result[i].dataValues.createdAt;
                            delete result[i].dataValues.updatedAt;

                            imagePromises[i] = ImageFacade.readOneByProduct(result[i].dataValues.productId)
                                .then(function (image) {
                                    if (image) {
                                        return image.dataValues.base64;
                                    }
                                });

                            bidPromises[i] = BidFacade.readMax(result[i].dataValues.auctionId)
                                .then(function (bid) {
                                    if (bid) {
                                        return bid;
                                    }
                                });

                            response.auctions.push(result[i].dataValues);
                        }

                        q.all(imagePromises).done(function () {
                            q.all(bidPromises).done(function () {

                                for (i = 0; i < response.auctions.length; i++) {
                                    response.auctions[i].image = imagePromises[i];
                                    response.auctions[i].maxBid = bidPromises[i];
                                }

                                return res.send(200, response);
                            });

                        });

                    }

                },
                function (err) {
                    return res.send(500, err);
                });

    };

    this.getAllByProduct = function (req, res) {

        var auction = {};

        auction.userId = req.params.facebookId;
        auction.productId = req.params.productId;

        return AuctionFacade.readAllByProduct(auction.userId, auction.productId)
            .then(
                function (result) {

                    var response = {};
                    var i;

                    response.auctions = [];

                    response.facebookId = auction.userId;
                    response.productId = auction.productId;

                    for (i = 0; i < result.length; i++) {

                        auctionStatus(result[i].dataValues);

                        delete result[i].dataValues.userId;
                        delete result[i].dataValues.createdAt;
                        delete result[i].dataValues.updatedAt;

                        response.auctions.push(result[i].dataValues);
                    }

                    return res.send(200, response);
                },
                function (err) {
                    return res.send(500, err);
                });

    };

    this.getOne = function (req, res) {

        var auction = {};

        auction.auctionId = req.params.auctionId;

        return AuctionFacade.readOne(auction.auctionId)
            .then(
                function (result) {

                    if(result) {
                        auctionStatus(result.dataValues);

                        delete result.dataValues.createdAt;
                        delete result.dataValues.updatedAt;

                        var auction = result.dataValues;

                        return ProductFacade.readOne(auction.productId).then(function(product) {
                            auction.productTitle = product.title;
                            return res.send(200, auction);

                        })


                    } else {
                        return res.send(204);
                    }

                },
                function (err) {
                    return res.send(500, err);
                });

    };

    this.add = function (req, res) {

        var auction = req.body;
        auction.userId = req.params.facebookId;

        if (auction.minimumBid <= 5){
            return res.send(400 , {message: 'minimumBid must be higher than 5.'});
        }

        let startTime = new Date(auction.startDate);
        let endTime = new Date(auction.endDate);
        let currentDate = new Date();

        if (startTime < currentDate){
            return res.send(400 , {message: 'Invalid start date.'});
        }

        if (endTime < startTime){
            return res.send(400 , {message: 'Invalid end date.'});
        }

        getSpecificProduct(auction.productId)
            .then(function (product) {
                if (product.status === 'pending') {
                    return AuctionFacade.create(auction)
                        .then(function (result) {
                            return res.send(201, {auctionId: result.dataValues.auctionId});
                        }, function (err) {
                            return res.send(500, {message: err});
                        });
                } else {
                    return res.send(400 , {message: 'Product is not pending.'});
                }
            });
    };

    this.update = function (req, res) {

        var auction = req.body;
        auction.userId = req.params.facebookId;
        auction.auctionId = req.params.auctionId;

        return AuctionFacade.update(auction)
            .spread(function () {
                return res.send(204);
            }, function (err) {
                return res.send(500, {message: err});
            });

    };

    this.getProducts = function (req, res) {

        var auction = {};
        auction.products = [];

        auction.auctionId = req.params.auctionId;

        return AuctionFacade.readOne(auction.auctionId)
            .then(function (result) {
                return ProductFacade.readOne(result.dataValues.productId);
            })
            .then(function (result) {

                    delete result.dataValues.createdAt;
                    delete result.dataValues.updatedAt;

                    auction.products.push(result.dataValues);

                    return res.send(200, auction);
                },
                function (err) {
                    return res.send(500, err);
                });
    };

    function auctionStatus(auction) {

        let startTime = new Date(auction.startDate);
        let endTime = new Date(auction.endDate);
        let currentServerDate = new Date();

        if (auction.isCanceled) {
            auction.status = "canceled";
        } else if (currentServerDate > startTime && currentServerDate < endTime) {
            auction.status = "active";
        } else if (currentServerDate < startTime) {
            auction.status = "pending";
        } else if (currentServerDate > endTime) {
            auction.status = "closed";
        }

        auction.currentServerDate = currentServerDate;
    }

    function getSpecificProduct(productId) {

        return ProductFacade.readOne(productId)
            .then(
                function (result) {

                    return productStatus(result.dataValues);

                },
                function (err) {
                    return res.send(500, err);
                });

    }

    function productStatus(product) {

        product.status = 'pending';

        if (product.isSold) {
            product.status = 'sold';
            return q.when(product);
        }

        return AuctionFacade.readAllByProduct(product.userId, product.productId)
            .then((auctions) => {
                for (var i in auctions) {

                    var auction = auctions[i].dataValues;

                    if (!auction.isCanceled) {
                        let startTime = new Date(auction.startDate);
                        let endTime = new Date(auction.endDate);
                        let currentDate = new Date();

                        if (currentDate >= startTime && currentDate < endTime) {
                            product.status = 'auctioning';
                        } else if (currentDate < startTime) {
                            product.status = 'awaiting';
                        }
                    }
                }

                return product;
            });
    }

}

AuctionsController.constructor = AuctionsController;
module.exports = AuctionsController;



