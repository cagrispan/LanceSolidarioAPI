'use strict';
var EmailFacade = require('../../models/facades/EmailsFacade');

function EmailsController() {

    this.getAll = function (req, res) {

        var email = {};

        email.userId = req.params.facebookId;

        return EmailFacade.readAll(email.userId)
            .then(
                function (result) {

                    var response = {};

                    response.facebookId = email.userId;
                    response.emails = [];

                    if(result) {
                        for(var i=0; i<result.length; i++){
                            delete result[i].dataValues.userId;
                            delete result[i].dataValues.createdAt;
                            delete result[i].dataValues.updatedAt;

                            response.emails.push(result[i].dataValues);
                        }
                    }

                    return res.send(200, response);
                },
                function (err) {
                    return res.send(500, err);
                });

    };

    this.add = function (req, res) {

        var email = req.body;
        email.userId = req.params.facebookId;

        return EmailFacade.create(email)
            .then(function (result) {
                return res.send(201, {emailId: result.dataValues.emailId});
            }, function (err) {
                return res.send(500, {message: err});
            });

    };

    this.update = function (req, res) {

        var email = req.body;
        email.userId = req.params.facebookId;
        email.emailId = req.params.emailId;

        return EmailFacade.update(email)
            .spread(function () {
                return res.send(204);
            }, function (err) {
                return res.send(500, {message: err});
            });

    };

    this.remove = function (req, res) {

        var email = {};
        email.emailId = req.params.emailId;

        return EmailFacade.remove(email)
            .then(function () {
                return res.send(204);
            }, function (err) {
                return res.send(500, {message: err});
            });

    };

}

EmailsController.constructor = EmailsController;
module.exports = EmailsController;



