'use strict';

var auctionEntity = require('../entities/Auction');

function AuctionEntityFacade() {
}

function create(auction) {
    return auctionEntity.create(auction);
}

function readAll(userId) {
    if (userId) {
        return auctionEntity.findAll({where: {userId: userId}});
    } else {
        return auctionEntity.findAll();
    }
}

function readOne(auctionId) {
    return auctionEntity.findOne({where: {auctionId: auctionId}});
}

function update(auction) {
    return auctionEntity.update(auction, {where: {auctionId: auction.auctionId}});
}

AuctionEntityFacade.prototype = {
    create: create,
    readAll: readAll,
    update: update,
    readOne: readOne
};

var auctionEntityFacade = new AuctionEntityFacade();
module.exports = auctionEntityFacade;
