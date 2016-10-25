var q = require("q");

function ProductMock() {
}

function create() {
    return q.when({dataValues: {id: 1}})
}

function readAll() {
    return q.when([
        {
            dataValues: {
                userId: 'userIdTest',
                createdAt: 'createdAtTest',
                updatedAt: 'updatedAtTest',
                param: 'paramTest'
            }
        },
        {
            dataValues: {
                userId: 'userIdTest',
                createdAt: 'createdAtTest',
                updatedAt: 'updatedAtTest',
                param: 'paramTest'
            }
        }]);
}

function update() {
    return {
        spread: function (fn) {
            fn({dataValues: {token: 'test'}});
            return q.when();
        }
    };
}

ProductMock.prototype = {
    create: create,
    readAll: readAll,
    update: update
};

module.exports = new ProductMock();
