'use strict';

var telephoneEntity = require('../entities/Telephone');

function TelephoneEntityFacade() {
}

function create(telephone) {
    return telephoneEntity.create(telephone);
}

function readAll(userId) {
    return telephoneEntity.findAll({where:{userId: userId}});
}

function read(telephoneId) {
    return telephoneEntity.findOne({where:{telephoneId: telephoneId}});
}

function update(telephone) {
    return telephoneEntity.update(telephone, {where: {telephoneId: telephone.telephoneId}});
}

function remove(telephone) {
    return read(telephone.telephoneId)
        .then(function (instance) {
            return instance.destroy({ force: true });
        });
}

TelephoneEntityFacade.prototype = {
    create: create,
    readAll: readAll,
    update: update,
    remove:remove
};

var telephoneEntityFacade = new TelephoneEntityFacade();
module.exports = telephoneEntityFacade;
