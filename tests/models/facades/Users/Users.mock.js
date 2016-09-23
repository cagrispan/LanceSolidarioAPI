var q = require("q");
var sinon = require("sinon");

function UserMock() {
    this.findOrCreate = sinon.spy(function (user) {
        return q.when({dataValues: {token: 'tokenTest'}});
    });

    this.facebookLogin = sinon.spy(function () {
        return q.when({dataValues: {token: 1}});
    });
}

module.exports = UserMock;
