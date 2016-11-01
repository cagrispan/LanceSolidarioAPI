'use strict';
var ProductFacade = require('../../models/facades/ProductsFacade');
var AuctionsFacade = require('../../models/facades/AuctionsFacade');
var Q = require('q');

function ProductsController() {

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

                    for (var i = 0; i < result.length; i++) {
                        let product = result[i].dataValues;

                        promises.push(productStatus(product.userId, product.productId)
                            .then((status) => {
                                if (product.isSold) {
                                    product.status = 'sold';
                                } else {
                                    product.status = status;
                                }

                                delete product.userId;
                                delete product.createdAt;
                                delete product.updatedAt;

                            }));

                        response.products.push(result[i].dataValues);
                    }

                    Q.all(promises)
                        .then((data) => {
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
                    let product = result.dataValues;

                    return productStatus(product.userId, product.productId)
                        .then((status) => {
                            if (product.isSold) {
                                product.status = 'sold';
                            } else {
                                product.status = status;
                            }

                            delete product.userId;
                            delete product.createdAt;
                            delete product.updatedAt;

                            return res.send(200, product);
                        });
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

        return ProductFacade.update(product)
            .spread(function () {
                return res.send(204);
            }, function (err) {
                return res.send(500, {message: err});
            });

    };

    function productStatus(userId, productId) {
        let status = 'pending';
        return AuctionsFacade.readAllByProduct(userId, productId)
            .then((data) => {
                for (var i in data) {
                    let startTime = new Date(data[i].dataValues.startDate);
                    let endTime = new Date(data[i].dataValues.endDate);
                    let currentDate = new Date();
                    if (currentDate > startTime && currentDate < endTime) {
                        if (!data[i].dataValues.isClosed && !data[i].dataValues.isCanceled)
                            status = 'auctioning';
                    }

                }

                return status;
            });
    }

}

ProductsController.constructor = ProductsController;
module.exports = ProductsController;



