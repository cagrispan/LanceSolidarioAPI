'use strict';
var ProductFacade = require('../../models/facades/ProductsFacade');

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

                    for(var i=0; i<result.length; i++){
                        delete result[i].dataValues.userId;
                        delete result[i].dataValues.createdAt;
                        delete result[i].dataValues.updatedAt;

                        response.products.push(result[i].dataValues);
                    }


                    return res.send(200, response);
                },
                function (err) {
                    return res.send(500, err);
                });

    };

    this.add = function (req, res) {

        var product = req.body;
        product.userId = req.params.facebookId;

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

}

ProductsController.constructor = ProductsController;
module.exports = ProductsController;



