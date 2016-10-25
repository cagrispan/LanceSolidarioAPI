'use strict';
function BidsMiddleware() {

    this.hasAllInformation = function (req, res, next) {

        if (req.body && req.params) {
            if (req.params.facebookId &&
                req.body.auctionId &&
                req.body.bid) {
                next();
            } else {
                res.send(404, {message: 'Parameters missing.', receivedObject: req.body });
            }
        } else {
            res.send(404, {message: 'Parameters missing.'});
        }

    };

    this.hasId = function (req, res, next) {

        if (req.params) {
            if (req.params.bidId) {
                next();
            } else {
                res.send(404, {message: 'Parameters missing.'});
            }
        } else {
            res.send(404, {message: 'Parameters missing.'});
        }

    };
}
BidsMiddleware.constructor = BidsMiddleware;
module.exports = BidsMiddleware;
