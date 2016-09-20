'use strict';
function ProductsMiddleware() {

    this.hasAllInformation = function (req, res, next) {

        if (req.body && req.params) {
            if (req.params.facebookId &&
                req.body.title &&
                req.body.description) {
                next();
            } else {
                res.send(404, {message: "Parameters missing.", receivedObject: req.body });
            }
        } else {
            res.send(404, {message: "Parameters missing."});
        }

    };

    this.hasId = function (req, res, next) {

        if (req.params) {
            if (req.params.productId) {
                next();
            } else {
                res.send(404, {message: "Parameters missing."});
            }
        } else {
            res.send(404, {message: "Parameters missing."});
        }

    };
}
ProductsMiddleware.constructor = ProductsMiddleware;
module.exports = ProductsMiddleware;
