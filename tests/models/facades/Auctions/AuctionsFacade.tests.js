'use strict';

var expect = require('chai').expect;
var auctionsFacade = require('./../../../../src/models/facades/AuctionsFacade');
var q = require('q');
var userToSearch;
var auctionToSearch;

describe('AuctionsFacade Tests', function () {

    it('create() should be a function', function (done) {

        expect(typeof auctionsFacade.create).to.equal('function');
        done();
    });

    it('create() should create an auction on database', function (done) {

        let auction = {
            productId: 9999,
            institutionId: 9999,
            userId: 'userIdTest',
            minimumBid: 99.99,
            startDate: new Date(),
            endDate: new Date()
        };

        auctionsFacade.create(auction).then((resolution) => {
            userToSearch = resolution.dataValues.userId;
            auctionToSearch = resolution.dataValues.auctionId;
            expect(resolution.dataValues.productId).to.equal(9999);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('readAll() should be a function', function (done) {

        expect(typeof auctionsFacade.readAll).to.equal('function');
        done();
    });

    it('readAll() should return all auctions', function (done) {

        auctionsFacade.readAll().then((resolution) => {
            expect(resolution[0].dataValues.auctionId).not.to.equal(null);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('readAll() should return all auctions to specific user', function (done) {

        auctionsFacade.readAll(userToSearch).then((resolution) => {
            expect(resolution[0].dataValues.userId).to.equal(userToSearch);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('readOne() should be a function', function (done) {

        expect(typeof auctionsFacade.readOne).to.equal('function');
        done();
    });

    it('readOne() should return a specific auction', function (done) {

        auctionsFacade.readOne(auctionToSearch).then((resolution) => {
            expect(resolution.dataValues.auctionId).to.equal(auctionToSearch);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('update() should be a function', function (done) {

        expect(typeof auctionsFacade.update).to.equal('function');
        done();
    });

    it('update() should update an auction on database', function (done) {

        let auction = {
            auctionId: auctionToSearch,
            productId: 9999,
            institutionId: 9999,
            userId: 'userIdTest',
            minimumBid: 999.99,
            startDate: new Date(),
            endDate: new Date()
        };

        auctionsFacade.update(auction).then((resolution) => {
            expect(resolution[0]).to.equal(1);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

});
