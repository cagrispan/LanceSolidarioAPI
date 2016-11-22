'use strict';
var BidFacade = require('../../models/facades/BidsFacade');

function BidsController() {

    this.getAll = function (req, res) {

        var searchParam = req.params.facebookId ? { userId: req.params.facebookId } : { auctionId: req.params.auctionId };

        return BidFacade.readAll(searchParam)
            .then(
                function (result) {

                    var response = {};
                    var i;

                    response.bids = [];

                    if(req.params.facebookId){

                        response.facebookId = req.params.facebookId;

                        if(result){
                            for (i = 0; i < result.length; i++) {

                                delete result[i].dataValues.userId;
                                delete result[i].dataValues.createdAt;
                                delete result[i].dataValues.updatedAt;

                                response.bids.push(result[i].dataValues);
                            }
                        }

                    }else{

                        response.auctionId = req.params.auctionId;

                        if(result){
                            for (i = 0; i < result.length; i++) {

                                delete result[i].dataValues.auctionId;
                                delete result[i].dataValues.createdAt;
                                delete result[i].dataValues.updatedAt;

                                response.bids.push(result[i].dataValues);
                            }
                        }

                    }

                    return res.send(200, response);
                },
                function (err) {
                    return res.send(500, err);
                });

    };

    this.add = function (req, res) {

        var bid = req.body;
        bid.userId = req.params.facebookId;
        bid.date = new Date();
        bid.isDeleted = false;

        return BidFacade.readMax(bid.auctionId).then(function(highestBid){
            if(bid.bid > highestBid){
                return BidFacade.create(bid)
                    .then(function (result) {
                        return res.send(201, {bidId: result.dataValues.bidId});
                    }, function (err) {
                        return res.send(500, {message: err});
                    });
            }else{
                return res.send(409, {message: 'Requested bid is lower then the highest bid'});
            }
        });
    };

    this.update = function (req, res) {

        var bid = req.body;
        bid.userId = req.params.facebookId;
        bid.bidId = req.params.bidId;

        return BidFacade.update(bid)
            .spread(function () {
                return res.send(204);
            }, function (err) {
                return res.send(500, {message: err});
            });

    };

}

BidsController.constructor = BidsController;
module.exports = BidsController;



