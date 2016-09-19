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

PurchaseEntityFacade.prototype = {
    create: create,
    readAll: readAll,
    update: update
};

var purchaseEntityFacade = new PurchaseEntityFacade();
module.exports = purchaseEntityFacade;
