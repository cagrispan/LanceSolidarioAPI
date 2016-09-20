'use strict';

var addressEntity = require('../entities/Address');

function AddressEntityFacade() {
}

function create(address) {
    return addressEntity.create(address);
}

function readAll(userId) {
    return addressEntity.findAll({where:{userId: userId}});
}

function read(addressId) {
    return addressEntity.findOne({where:{addressId: addressId}});
}

function update(address) {
    return addressEntity.update(address, {where: {addressId: address.addressId}});
}

function remove(address) {
    return read(address.addressId)
        .then(function (instance) {
            return instance.destroy({ force: true });
        });
}

AddressEntityFacade.prototype = {
    create: create,
    readAll: readAll,
    update: update,
    remove:remove
};

var addressEntityFacade = new AddressEntityFacade();
module.exports = addressEntityFacade;
