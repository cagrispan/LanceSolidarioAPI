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

function readOne(productId) {
    return productEntity.findOne({where:{productId: productId}});
}

function update(product) {
    return productEntity.update(product, {where: {productId: product.productId}});
}

ProductEntityFacade.prototype = {
    create: create,
    readAll: readAll,
    update: update,
    readOne: readOne
};

var productEntityFacade = new ProductEntityFacade();
module.exports = productEntityFacade;
