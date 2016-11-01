'use strict';
var AuctionFacade = require('../models/facades/AuctionsFacade');

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
                res.send(404, {message: 'Parameters missing.', receivedObject: req.body});
            }
        } else {
            res.send(404, {message: 'Parameters missing.'});
        }

    };

    this.hasOpenedAuction = function (req, res, next) {
        let isValid = true;

        AuctionFacade.readAllByProduct(req.params.facebookId, req.body.productId)
            .then((data) => {
                for (var i in data) {
                    let startTime = new Date(data[i].dataValues.startDate);
                    let endTime = new Date(data[i].dataValues.endDate);
                    let currentDate = new Date();
                    if (currentDate > startTime && currentDate < endTime) {
                        if (!data[i].isClosed && !data[i].isCanceled)
                            isValid = false;
                    }
                }
                if(isValid) {
                    next();
                } else {
                    res.send(401, {message: 'This product has an auction pending'});
                }
            });
    };

    this.hasEnoughMinimumBid = function(req, res, next) {
        if(req.params.minimumBid > 5) {
            next();
        } else {
            res.send(401, {message: 'Minimum bid is less than 5 Temers.'});
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
