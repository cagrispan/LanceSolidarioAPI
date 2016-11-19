'use strict';
var InstitutionsFacade = require('../../models/facades/InstitutionsFacade');
var q = require('q');

function InstitutionsController() {

    this.getAll = function (req, res) {
        var institutions = [];

        return InstitutionsFacade.readAll().then(function(resolution) {
            for(var i in resolution) {
                delete resolution[i].dataValues.createdAt;
                delete resolution[i].dataValues.updatedAt;

                institutions.push(resolution[i].dataValues);
            }
            return res.send(200, institutions);
        });
    };

    this.getOne = function (req, res) {

        return InstitutionsFacade.readOne(req.params.institutionId)
            .then(function (result) {

                    delete result.dataValues.createdAt;
                    delete result.dataValues.updatedAt;

                    var institution = result.dataValues;

                    return res.send(200, institution);
                },
                function (err) {
                    return res.send(500, err);
                });
    };

}

InstitutionsController.constructor = InstitutionsController;
module.exports = InstitutionsController;



