var q = require("q");
var sinon = require("sinon");

function UserMock() {
}

function findOrCreate() {
    return {
        spread: function (fn) {
            fn({dataValues: {token: 'test'}});
            return q.when();
        }
    };
}

UserMock.prototype = {
    findOrCreate: findOrCreate
};

module.exports = new UserMock();
