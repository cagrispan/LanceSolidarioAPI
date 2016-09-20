'use strict';
var jwt = require('jsonwebtoken');

function AuthMiddleware() {

    this.isLogged = function (req, res, next) {
        if (req.headers.token) {
            var decoded = jwt.verify(req.headers.token, 'banana');
            if (decoded.id == req.params.facebookId) {
                return next();
            } else {
                return res.send(401, {'code': 'Unauthorized', 'message': 'Unauthorized. Invalid token.'});
            }
        } else {
            return res.send(401, {'code': 'Unauthorized', 'message': 'Unauthorized. Missing token.'});
        }

    };
}
AuthMiddleware.constructor = AuthMiddleware;
module.exports = AuthMiddleware;
