'use strict';
var PurchaseFacade = require('../../models/facades/PurchasesFacade');

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

        return PurchaseFacade.create(purchase)
            .then(function (result) {
                return res.send(201, {purchaseId: result.dataValues.purchaseId});
            }, function (err) {
                return res.send(500, {message: err});
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



