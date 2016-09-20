'use strict';

var emailEntity = require('../entities/Email');

function EmailEntityFacade() {
}

function create(email) {
    return emailEntity.create(email);
}

function readAll(userId) {
    return emailEntity.findAll({where:{userId: userId}});
}

function read(emailId) {
    return emailEntity.findOne({where:{emailId: emailId}});
}

function update(email) {
    return emailEntity.update(email, {where: {emailId: email.emailId}});
}

function remove(email) {
    return read(email.emailId)
        .then(function (instance) {
            return instance.destroy({ force: true });
        });
}

EmailEntityFacade.prototype = {
    create: create,
    readAll: readAll,
    update: update,
    remove:remove
};

var emailEntityFacade = new EmailEntityFacade();
module.exports = emailEntityFacade;
