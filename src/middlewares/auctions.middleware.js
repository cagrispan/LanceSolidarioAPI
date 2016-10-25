'use strict';
function AuctionsMiddleware() {

    this.hasAllInformation = function (req, res, next) {

        if (req.body && req.params) {
            if (req.params.facebookId &&
                req.body.productId &&
                req.body.institutionId &&
                req.body.minimumBid &&
                req.body.startDate &&
                req.body.endDate) {
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
            if (req.params.auctionId) {
                next();
            } else {
                res.send(404, {message: 'Parameters missing.'});
            }
        } else {
            res.send(404, {message: 'Parameters missing.'});
        }

    };
}
AuctionsMiddleware.constructor = AuctionsMiddleware;
module.exports = AuctionsMiddleware;
