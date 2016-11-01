'use strict';
var AuctionFacade = require('../models/facades/AuctionsFacade');

function AuctionsMiddleware() {

    this.hasAllInformation = function (req, res, next) {

        if (req.body && req.params) {
            if (req.params.facebookId &&
                req.body.productId &&
                req.body.auctionId) {
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

    this.hasOpenedAuction = function (req, res, next) {

        AuctionFacade.readAllByProduct(req.params.facebookId, req.body.productId)
            .then((data) => {
                console.log("READ ALL BY PRODUCT: ",data);
            });
    }
}
AuctionsMiddleware.constructor = AuctionsMiddleware;
module.exports = AuctionsMiddleware;
