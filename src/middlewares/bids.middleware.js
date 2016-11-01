'use strict';
var BidsFacade = require('../models/facades/BidsFacade');
var AuctionsFacade = require('../models/facades/AuctionsFacade');

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

    this.isHighestBid = function(req, res, next) {
       BidsFacade.readMax(req.body.auctionId)
           .then((greaterBid) => {
               if(req.body.bid > greaterBid) {
                   next();
               } else{
                   res.send(401, {message: 'Bid is not the greaterBid'});
               }
           })
    };

    this.isValidAuction = function(req, res, next) {
        let isValid = false;

        AuctionsFacade.readOne(req.body.auctionId)
            .then((data) => {
                let startTime = new Date(data.dataValues.startDate);
                let endTime = new Date(data.dataValues.endDate);
                let currentDate = new Date();
                if (currentDate > startTime && currentDate < endTime) {
                    if (!data.dataValues.isClosed && !data.dataValues.isCanceled)
                        isValid = true;
                }
                if(isValid) {
                    next();
                } else {
                    res.send(401, {message: 'This auctions is invalid to bid.'});
                }

            });
    }
}
BidsMiddleware.constructor = BidsMiddleware;
module.exports = BidsMiddleware;
