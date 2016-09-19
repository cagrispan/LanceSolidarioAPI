'use strict';

var bidEntity = require('../entities/Bid');

function BidEntityFacade() {
}

function create(bid) {
    return bidEntity.create(bid);
}

function readAll(whereItem) {
    return bidEntity.findAll({where: whereItem});
}

function readMax(auctionId) {
    return bidEntity.max('bid', {where: {auctionId: auctionId}});
}

function update(bid) {
    return bidEntity.update(bid, {where: {bidId: bid.bidId}});
}

BidEntityFacade.prototype = {
    create: create,
    readAll: readAll,
    update: update,
    readMax: readMax
};

var bidEntityFacade = new BidEntityFacade();
module.exports = bidEntityFacade;
