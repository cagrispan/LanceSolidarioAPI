'use strict';

var expect = require('chai').expect;
var proxyquire = require("proxyquire");
var ProductMock = require('./../../models/facades/Products/Products.mock');
var ProductsController = proxyquire('../../../src/controllers/products/products.controller.js',
    {'../../models/facades/ProductsFacade': ProductMock});
var sinon = require('sinon');
var q = require('q');

describe('Products controller Tests', function () {

    var productsController = new ProductsController();

    it('add should be a function', function(done) {
        expect(typeof productsController.add).to.equal('function');
        done();
    });

    it('add should return 201', function (done) {
        var req = {
            params: {
                facebookId: 'facebookIdTest'
            },
            body: {
                title: 'titletest',
                description: 'descriptionTest',
                category: 'categoryTest',
                tags: 'tagstest',
                isUsed: false,
                images: '',
                auctions: '',
                donorUser: 24
            }
        };

        var res = {send: sinon.spy()};

        productsController.add(req, res).then(function () {
            expect(res.send.calledWith(201)).to.equal(true);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('getAll should be a function', function(done) {
        expect(typeof productsController.getAll).to.equal('function');
        done();
    });

    it('getAll should return 200', function (done) {
        var req = {
            params: {
                facebookId: 'facebookIdTest'
            }
        };

        var res = {send: sinon.spy()};

        productsController.getAll(req, res).then(function () {
            expect(res.send.calledWith(200)).to.equal(true);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('update should be a function', function(done) {
        expect(typeof productsController.update).to.equal('function');
        done();
    });

    it('update should return 204', function (done) {
        var req = {
            params: {
                facebookId: 'facebookIdTest'
            },
            body: {
                title: 'titletest',
                description: 'descriptionTest',
                category: 'categoryTest',
                tags: 'tagstest',
                isUsed: false,
                images: '',
                auctions: '',
                donorUser: 24
            }
        };

        var res = {send: sinon.spy()};

        productsController.update(req, res).then(function () {
            expect(res.send.calledWith(204)).to.equal(true);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });


});

