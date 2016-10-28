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

                            let startTime = new Date(result[i].dataValues.startDate);
                            let endTime = new Date(result[i].dataValues.endDate);
                            let currentServerDate = new Date();
                            result[i].dataValues.currentServerDate = currentServerDate;

                            if (result[i].dataValues.isClosed) {
                                result[i].dataValues.status = "closed";
                            } else if (currentServerDate > startTime && currentServerDate < endTime) {
                                result[i].dataValues.status = "active";
                            } else if (currentServerDate < startTime) {
                                result[i].dataValues.status = "pending";
                            } else if (currentServerDate > endTime) {
                                result[i].dataValues.status = "finished";
                            }

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

                        let startTime = new Date(result[i].dataValues.startDate);
                        let endTime = new Date(result[i].dataValues.endDate);
                        let currentDate = new Date();

                        if (result[i].dataValues.isClosed) {
                            result[i].dataValues.status = "closed";
                        } else if (currentDate > startTime && currentDate < endTime) {
                            result[i].dataValues.status = "active";
                        } else if (currentDate < startTime) {
                            result[i].dataValues.status = "pending";
                        } else if (currentDate > endTime) {
                            result[i].dataValues.status = "finished";
                        }

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
                    let startTime = new Date(result.dataValues.startDate);
                    let endTime = new Date(result.dataValues.endDate);
                    let currentDate = new Date();

                    if (result.dataValues.isClosed) {
                        result.dataValues.status = "closed";
                    } else if (currentDate > startTime && currentDate < endTime) {
                        result.dataValues.status = "active";
                    } else if (currentDate < startTime) {
                        result.dataValues.status = "pending";
                    } else if (currentDate > endTime) {
                        result.dataValues.status = "finished";
                    }
                    delete result.dataValues.createdAt;
                    delete result.dataValues.updatedAt;

                    return res.send(200, result.dataValues);
                },
                function (err) {
                    return res.send(500, err);
                });

    };

    this.add = function (req, res) {

        var auction = req.body;
        auction.userId = req.params.facebookId;

        return AuctionFacade.create(auction)
            .then(function (result) {
                return res.send(201, {auctionId: result.dataValues.auctionId});
            }, function (err) {
                return res.send(500, {message: err});
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

        auction.auctionId = req.params.auctionId;

        return AuctionFacade.readOne(auction.auctionId)
            .then(function (result) {
                return ProductFacade.readOne(result.dataValues.productId);
            })
            .then(function (result) {

                    delete result.dataValues.createdAt;
                    delete result.dataValues.updatedAt;

                    auction.products = result.dataValues;

                    return res.send(200, auction);
                },
                function (err) {
                    return res.send(500, err);
                });
    };

}

AuctionsController.constructor = AuctionsController;
module.exports = AuctionsController;



