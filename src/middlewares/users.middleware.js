'use strict';
function UsersMiddleware() {

    this.hasAllInformation = function (req, res, next) {

        if (req.body && req.params) {
            if (req.body.name &&
                req.body.birthday &&
                req.body.facebookId &&
                req.body.facebookToken) {
                next();
            } else {
                res.send(404, {message: 'Parameters missing.'});
            }
        } else {
            res.send(404, {message: 'Parameters missing.'});
        }

    };
}
UsersMiddleware.constructor = UsersMiddleware;
module.exports = UsersMiddleware;
