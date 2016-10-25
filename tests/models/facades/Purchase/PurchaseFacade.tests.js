'use strict';

var expect = require('chai').expect;
var purchaseFacade = require('./../../../../src/models/facades/PurchasesFacade');
var q = require('q');
var purchaseToSearch;
var userToSearch;

describe('PurchaseFacade Tests', function () {

    it('create() should be a function', function (done) {

        expect(typeof purchaseFacade.create).to.equal('function');
        done();
    });

    it('create() should create a purchase on database', function (done) {

        let purchase = {
            userId: 'userIdTest',
            auctionId: 9999,
            productId: 9999,
            paymentId: 9999,
            deliveryId: 9999
        };

        purchaseFacade.create(purchase).then((resolution) => {
            purchaseToSearch = resolution.dataValues.purchaseId;
            userToSearch = resolution.dataValues.userId;
            expect(resolution.dataValues.userId).to.equal('userIdTest');
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('readAll() should be a function', function (done) {

        expect(typeof purchaseFacade.readAll).to.equal('function');
        done();
    });

    it('readAll() should return all purchase from an user', function (done) {

        purchaseFacade.readAll(userToSearch).then((resolution) => {
            expect(resolution[0].dataValues.userId).to.equal(userToSearch);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('update() should be a function', function (done) {

        expect(typeof purchaseFacade.update).to.equal('function');
        done();
    });

    it('update() should update a purchase on database', function (done) {

        let purchase = {
            purchaseId: purchaseToSearch,
            userId: 'userIdTest',
            auctionId: 9999,
            productId: 9999,
            paymentId: 9999,
            deliveryId: 9999
        };

        purchaseFacade.update(purchase).then((resolution) => {
            expect(resolution[0]).to.equal(1);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

});
