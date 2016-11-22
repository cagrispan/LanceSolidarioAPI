'use strict';
var TelephoneFacade = require('../../models/facades/TelephonesFacade');

function TelephonesController() {

    this.getAll = function (req, res) {

        var telephone = {};

        telephone.userId = req.params.facebookId;

        return TelephoneFacade.readAll(telephone.userId)
            .then(
                function (result) {

                    var response = {};

                    response.facebookId = telephone.userId;
                    response.telephones = [];

                    if(result) {
                        for(var i=0; i<result.length; i++){
                            delete result[i].dataValues.userId;
                            delete result[i].dataValues.createdAt;
                            delete result[i].dataValues.updatedAt;

                            response.telephones.push(result[i].dataValues);
                        }
                    }

                    return res.send(200, response);
                },
                function (err) {
                    return res.send(500, err);
                });

    };

    this.add = function (req, res) {

        var telephone = req.body;
        telephone.userId = req.params.facebookId;

        return TelephoneFacade.create(telephone)
            .then(function (result) {
                return res.send(201, {telephoneId: result.dataValues.telephoneId});
            }, function (err) {
                return res.send(500, {message: err});
            });

    };

    this.update = function (req, res) {

        var telephone = req.body;
        telephone.userId = req.params.facebookId;
        telephone.telephoneId = req.params.telephoneId;

        return TelephoneFacade.update(telephone)
            .spread(function () {
                return res.send(204);
            }, function (err) {
                return res.send(500, {message: err});
            });

    };

    this.remove = function (req, res) {

        var telephone = {};
        telephone.telephoneId = req.params.telephoneId;

        return TelephoneFacade.remove(telephone)
            .then(function () {
                return res.send(204);
            }, function (err) {
                return res.send(500, {message: err});
            });

    };

}

TelephonesController.constructor = TelephonesController;
module.exports = TelephonesController;



