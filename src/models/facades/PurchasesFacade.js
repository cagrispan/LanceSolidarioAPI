'use strict';

var purchaseEntity = require('../entities/Purchase');

function PurchaseEntityFacade() {
}

function create(purchase) {
    return purchaseEntity.create(purchase);
}

function readAll(userId) {
    return purchaseEntity.findAll({where: {userId: userId}});
}

function update(purchase) {
    return purchaseEntity.update(purchase, {where: {purchaseId: purchase.purchaseId}});
}

function getByReference(reference) {
    return purchaseEntity.findOne({where: {reference: reference}});
}

function readOne(purchaseId) {
    return purchaseEntity.findOne({where: {purchaseId: purchaseId}});
}

function getByAuction(auctionId) {
    return purchaseEntity.findAll({where: {auctionId: auctionId}});
}

PurchaseEntityFacade.prototype = {
    create: create,
    readAll: readAll,
    update: update,
    getByReference: getByReference,
    readOne: readOne,
    getByAuction: getByAuction
};

var purchaseEntityFacade = new PurchaseEntityFacade();
module.exports = purchaseEntityFacade;
