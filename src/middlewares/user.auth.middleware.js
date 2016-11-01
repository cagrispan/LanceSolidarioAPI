'use strict';
var UsersController = require('./../controllers/users/users.controller');
var usersController = new UsersController();

var jwt = require('jsonwebtoken');

function UserAuthMiddleware() {

    this.isLogged = function (req, res) {
        if (req.headers.token) {
            var decoded = jwt.verify(req.headers.token, 'banana');
            if (decoded.id === req.params.facebookId) {
                return usersController.get(req, res);
            } else {
                return res.send(401, {'code': 'Unauthorized', 'message': 'Unauthorized. Invalid token.'});
            }
        } else {
            return usersController.getUnauth(req, res);
        }

    };
}
UserAuthMiddleware.constructor = UserAuthMiddleware;
module.exports = UserAuthMiddleware;
