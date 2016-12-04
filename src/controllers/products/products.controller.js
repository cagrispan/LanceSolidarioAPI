'use strict';
var ProductFacade = require('../../models/facades/ProductsFacade');
var AuctionsFacade = require('../../models/facades/AuctionsFacade');
var Q = require('q');

function ProductsController() {

    ProductsController.constructor = ProductsController;

    this.getAll = function (req, res) {

        var product = {};

        product.userId = req.params.facebookId;

        return ProductFacade.readAll(product.userId)
            .then(
                function (result) {

                    var response = {};

                    response.facebookId = product.userId;
                    response.products = [];

                    let promises = [];

                    if(result) {
                        for (var i = 0; i < result.length; i++) {

                            promises.push(productStatus(result[i].dataValues)
                                .then((product) => {

                                    delete product.userId;
                                    delete product.createdAt;
                                    delete product.updatedAt;

                                    response.products.push(product);
                                }));

                        }
                    }

                    Q.all(promises)
                        .then(() => {
                            return res.send(200, response);
                        });


                },
                function (err) {
                    return res.send(500, err);
                });

    };

    this.getSpecificProduct = function (req, res) {

        return ProductFacade.readOne(req.params.productId)
            .then(
                function (result) {

                    if(result) {
                        return productStatus(result.dataValues)
                            .then((product) => {

                                delete product.userId;
                                delete product.createdAt;
                                delete product.updatedAt;

                                return res.send(200, product);
                            });
                    } else {
                        return res.send(404);
                    }

                },
                function (err) {
                    return res.send(500, err);
                });

    };

    this.add = function (req, res) {

        var product = req.body;
        product.userId = req.params.facebookId;
        product.isDeleted = false;

        return ProductFacade.create(product)
            .then(function (result) {
                return res.send(201, {productId: result.dataValues.productId});
            }, function (err) {
                return res.send(500, {message: err});
            });

    };

    this.update = function (req, res) {

        var product = req.body;

        product.userId = req.params.facebookId;
        product.productId = req.params.productId;

        return ProductFacade.readOne(product.productId)
            .then(function (result) {
                    return productStatus(result.dataValues)
                },
                function (err) {
                    return res.send(500, err);
                })
            .then(function (result) {
                    if (result.status === 'pending' || result.isSold != product.isSold) {
                        return ProductFacade.update(product)
                            .spread(function () {
                                return res.send(204);
                            }, function (err) {
                                return res.send(500, {message: err});
                            });
                    } else {
                        return res.send(409, {message: 'Update conflict.'});
                    }
                },
                function (err) {
                    return res.send(500, err);
                });
    };

    function productStatus(product) {

        product.status = 'pending';

        if (product.isSold) {
            product.status = 'sold';
            return Q.when(product);
        }

        return AuctionsFacade.readAllByProduct(product.userId, product.productId)
            .then((auctions) => {
                for (var i in auctions) {

                    var auction = auctions[i].dataValues;

                    if (!auction.isCanceled){
                        let startTime = new Date(auction.startDate);
                        let endTime = new Date(auction.endDate);
                        let currentDate = new Date();

                        if (currentDate >= startTime && currentDate < endTime) {
                            product.status = 'auctioning';
                        } else if (currentDate < startTime) {
                            product.status = 'awaiting';
                        } else if (currentDate > endTime) {
                            product.status = 'awaitingProcess';
                        }
                    }
                }

                return product;
            });
    }

}

module.exports = ProductsController;



