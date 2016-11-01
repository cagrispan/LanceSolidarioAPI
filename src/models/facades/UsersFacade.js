'use strict';

var userEntity = require('../entities/User');

function UserEntityFacade() {
}

function findOrCreate(user) {
    return userEntity.findOrCreate({
        where: {
            facebookId: user.facebookId
        },
        defaults:{
            facebookToken: user.facebookToken,
            token: user.token,
            birthday: user.birthday,
            name: user.name,
            profilePicture: user.profilePicture
        }
    });
}

function read(facebookId) {
    return userEntity.findOne({where:{facebookId: facebookId}});
}

function update(user) {
    return userEntity.update(user, {where: {facebookId: user.facebookId}});
}

function findOne(facebookId) {
    return userEntity.findOne({where: {facebookId: facebookId}});
}


UserEntityFacade.prototype = {
    findOrCreate: findOrCreate,
    read: read,
    update: update,
    findOne: findOne
};

var userEntityFacade = new UserEntityFacade();
module.exports = userEntityFacade;
