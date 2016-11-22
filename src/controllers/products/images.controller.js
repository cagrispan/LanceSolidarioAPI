'use strict';
var ImageFacade = require('../../models/facades/ImagesFacade');

function ImagesController() {
    this.add = function (req, res) {

        var image = req.body;
        image.facebookId = req.params.facebookId;
        image.productId = req.params.productId;

        return ImageFacade.create(image)
            .then(function (result) {
                return res.send(201, {imageId: result.dataValues.imageId});
            }, function (err) {
                return res.send(500, {message: err});
            });

    };

    this.get = function (req, res) {

        return ImageFacade.readByProduct(req.params.productId)
            .then(function (result) {
                let images = [];

                if(result) {
                    for(var i in result) {
                        let image = result[i].dataValues;

                        delete image.createdAt;
                        delete image.updatedAt;

                        images.push(image);
                    }
                }
                return res.send(200, images);
            }, function (err) {
                return res.send(500, {message: err});
            });

    };

    this.remove = function (req, res) {

        return ImageFacade.remove(req.params.imageId)
            .then(function () {
                return res.send(200);
            }, function (err) {
                return res.send(500, {message: err});
            });

    };

}

ImagesController.constructor = ImagesController;
module.exports = ImagesController;



