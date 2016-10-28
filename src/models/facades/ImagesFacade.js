'use strict';

var imageEntity = require('../entities/Image');

function ImageEntityFacade() {
}

function create(image) {
    return imageEntity.create(image);
}

// function readAll(userId) {
//     return imageEntity.findAll({where:{userId: userId}});
// }
//
function readByProduct(productId) {
    return imageEntity.findAll({where:{productId: productId}});
}

function readOneByProduct(productId) {
    return imageEntity.findOne({where:{productId: productId}});
}

function remove(imageId) {
    return imageEntity.findOne({where: {imageId: imageId}})
        .then(function (instance) {
            return instance.destroy({force:true});
        });
}

ImageEntityFacade.prototype = {
    create: create,
    readByProduct: readByProduct,
    remove: remove,
    readOneByProduct: readOneByProduct
};

var imageEntityFacade = new ImageEntityFacade();
module.exports = imageEntityFacade;
