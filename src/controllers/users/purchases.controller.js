'use strict';
var PurchaseFacade = require('../../models/facades/PurchasesFacade');
var Client = require('node-rest-client').Client;
var BidsFacade = require('../../models/facades/BidsFacade');
var ProductsFacade = require('../../models/facades/ProductsFacade');
var uuid = require('uuid');

function PurchasesController() {

    this.getAll = function (req, res) {

        var purchase = {};

        purchase.userId = req.params.facebookId;

        return PurchaseFacade.readAll(purchase.userId)
            .then(
                function (result) {

                    var response = {};

                    response.purchases = [];
                    response.facebookId = purchase.userId;

                    for (var i = 0; i < result.length; i++) {

                        delete result[i].dataValues.userId;
                        delete result[i].dataValues.createdAt;
                        delete result[i].dataValues.updatedAt;

                        response.purchases.push(result[i].dataValues);
                    }

                    return res.send(200, response);
                },
                function (err) {
                    return res.send(500, err);
                });

    };

    this.add = function (req, res) {

        var purchase = req.body;
        purchase.userId = req.params.facebookId;

        let postObject = {
            "redirectUrl": req.body.redirectUrl,
            "reviewUrl": req.body.reviewUrl,
            "reference": uuid.v1(),
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

            postObject.items[0].amount = resolution.toFixed(2);

            return ProductsFacade.readOne(postObject.items[0].id).then(resolution => {
                postObject.items[0].description = resolution.dataValues.description;

                client.post("http://localhost:7811/payments", args, function (data, response) {

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

}

PurchasesController.constructor = PurchasesController;
module.exports = PurchasesController;



