'use strict';

var expect = require('chai').expect;
var productsFacade = require('./../../../../src/models/facades/ProductsFacade');
var q = require('q');
var productIdToSearch;

describe('ProductsFacade Tests', function () {


    it('create() should be a function', function (done) {

        expect(typeof productsFacade.create).to.equal('function');
        done();
    });

    it('create() should create a product on database', function (done) {

        let product = {
            title: 'titleTest',
            userId: 'userIdTest',
            description: 'descriptionTest',
            isUsed: true,
            isDeleted: false
        };

        productsFacade.create(product).then((resolution) => {
            productIdToSearch = resolution.dataValues.productId;
            expect(resolution.dataValues.title).to.equal('titleTest');
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('readAll() should be a function', function (done) {

        expect(typeof productsFacade.readAll).to.equal('function');
        done();
    });

    it('readAll() should retrieve all products from database', function (done) {

        let userId = 'userIdTest';

        productsFacade.readAll(userId).then((resolution) => {
            expect(resolution[0].dataValues.title).to.equal('titleTest');
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('readOne() should be a function', function (done) {

        expect(typeof productsFacade.readOne).to.equal('function');
        done();
    });

    it('readOne() should retrieve a specific product from database', function (done) {

        productsFacade.readOne(productIdToSearch).then((resolution) => {
            expect(resolution.dataValues.title).to.equal('titleTest');
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

});
