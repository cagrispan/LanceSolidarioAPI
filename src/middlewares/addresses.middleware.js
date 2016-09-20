'use strict';
function AddressesMiddleware() {

    this.hasAllInformation = function (req, res, next) {

        if (req.body && req.params) {
            if (req.params.facebookId &&
                req.body.street &&
                req.body.number &&
                req.body.complement &&
                req.body.neighborhood &&
                req.body.city &&
                req.body.state) {
                next();
            } else {
                res.send(404, {message: 'Parameters missing.'});
            }
        } else {
            res.send(404, {message: 'Parameters missing.'});
        }

    };

    this.hasId = function (req, res, next) {

        if (req.params) {
            if (req.params.addressId) {
                next();
            } else {
                res.send(404, {message: 'Parameters missing.'});
            }
        } else {
            res.send(404, {message: 'Parameters missing.'});
        }

    };
}
AddressesMiddleware.constructor = AddressesMiddleware;
module.exports = AddressesMiddleware;
