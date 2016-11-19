'use strict';
var UserFacade = require('../../models/facades/UsersFacade');
var AddressFacade = require('../../models/facades/AddressesFacade');
var jwt = require('jsonwebtoken');

function UsersController() {

    this.get = function (req, res) {

        var user = {};

        user.facebookId = req.params.facebookId;

        return UserFacade.read(user.facebookId)
            .then(
                function (result) {

                    delete result.dataValues.userId;
                    delete result.dataValues.token;
                    delete result.dataValues.createdAt;
                    delete result.dataValues.updatedAt;

                    return res.send(200, result.dataValues);
                },
                function (err) {
                    return res.send(500, err);
                });

    };

    this.getUnauth = function (req, res) {

        var user = {};

        user.facebookId = req.params.facebookId;

        return UserFacade.read(user.facebookId)
            .then(
                function (result) {

                    delete result.dataValues.userId;
                    delete result.dataValues.token;
                    delete result.dataValues.createdAt;
                    delete result.dataValues.updatedAt;
                    delete result.dataValues.facebookToken;
                    delete result.dataValues.birthday;

                    var returnedUser = result.dataValues;

                    return AddressFacade.readAll(returnedUser.facebookId).then(function(result){
                        var address;
                        if(result.length) {
                            address = result[0].dataValues;
                            delete address.createdAt;
                            delete address.updatedAt;
                            delete address.addressId;
                            delete address.neighborhood;
                            delete address.complement;
                            delete address.number;
                            delete address.userId;
                            delete address.street;
                        }

                        returnedUser.address = address;
                        return res.send(200, returnedUser);

                    });

                },
                function (err) {
                    return res.send(500, err);
                });

    };

    this.update = function(req, res){

        var user =  req.body;
        user.birthday = new Date(req.body.birthday);
        user.token = jwt.sign({id: user.facebookId}, 'banana', {algorithm: 'HS256'});

        return UserFacade.update(user)
            .spread(function () {
                return res.send(204);
            }, function (err) {
                return res.send(500, {message: err});
            });

    };

}

UsersController.constructor = UsersController;
module.exports = UsersController;



