'use strict';
var AddressFacade = require('../../models/facades/AddressesFacade');

function AddressesController() {

    this.getAll = function (req, res) {

        var address = {};

        address.userId = req.params.facebookId;

        return AddressFacade.readAll(address.userId)
            .then(
                function (result) {

                    var response = {};

                    response.facebookId = address.userId;
                    response.addresses = [];

                    if (result) {
                        for (var i = 0; i < result.length; i++) {
                            delete result[i].dataValues.userId;
                            delete result[i].dataValues.createdAt;
                            delete result[i].dataValues.updatedAt;

                            response.addresses.push(result[i].dataValues);
                        }
                    }

                    return res.send(200, response);
                },
                function (err) {
                    return res.send(500, err);
                });

    };

    this.add = function (req, res) {

        var address = req.body;
        address.userId = req.params.facebookId;

        return AddressFacade.create(address)
            .then(function (result) {
                return res.send(201, {addressId: result.dataValues.addressId});
            }, function (err) {
                return res.send(500, {message: err});
            });

    };

    this.update = function (req, res) {

        var address = req.body;
        address.userId = req.params.facebookId;
        address.addressId = req.params.addressId;

        return AddressFacade.update(address)
            .spread(function () {
                return res.send(204);
            }, function (err) {
                return res.send(500, {message: err});
            });

    };

    this.remove = function (req, res) {

        var address = {};
        address.addressId = req.params.addressId;

        return AddressFacade.remove(address)
            .then(function () {
                return res.send(204);
            }, function (err) {
                return res.send(500, {message: err});
            });

    };

}

AddressesController.constructor = AddressesController;
module.exports = AddressesController;



