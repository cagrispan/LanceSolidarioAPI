'use strict';

var productEntity = require('../entities/Product');

function ProductEntityFacade() {
}

function create(product) {
    return productEntity.create(product);
}

function readAll(userId) {
    return productEntity.findAll({where:{userId: userId}});
}

function update(product) {
    return productEntity.update(product, {where: {productId: product.productId}});
}

ProductEntityFacade.prototype = {
    create: create,
    readAll: readAll,
    update: update
};

var productEntityFacade = new ProductEntityFacade();
module.exports = productEntityFacade;
