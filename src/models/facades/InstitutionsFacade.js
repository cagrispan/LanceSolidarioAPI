'use strict';

var institutionEntity = require('../entities/Institution');

function InstitutionEntityFacade() {
}

function readAll() {
    return institutionEntity.findAll();
}

function readOne(institutionId) {
    return institutionEntity.findOne({where:{institutionId: institutionId}});
}

InstitutionEntityFacade.prototype = {
    readAll: readAll,
    readOne: readOne
};

var institutionEntityFacade = new InstitutionEntityFacade();
module.exports = institutionEntityFacade;
