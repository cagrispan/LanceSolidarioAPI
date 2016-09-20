'use strict';
var UserFacade = require('../../models/facades/UsersFacade');
var jwt = require('jsonwebtoken');

function AuthController() {

    this.login = function (req, res) {

        var user =  req.body;
        user.birthday = new Date(req.body.birthday);
        user.token = jwt.sign({id: user.facebookId}, 'banana', {algorithm: 'HS256'});

        return UserFacade.findOrCreate(user)
            .spread(function (resolution) {
                return res.send(201, {token: resolution.dataValues.token});
            }, function (err) {
                return res.send(500, {message: err});
            });

    };

}

AuthController.constructor = AuthController;
module.exports = AuthController;
