'use strict';

var expect = require('chai').expect;
var bidsFacade = require('./../../../../src/models/facades/BidsFacade');
var q = require('q');
var bidToSearch;
var auctionToSearch;

describe('BidsFacade Tests', function () {

    it('create() should be a function', function (done) {

        expect(typeof bidsFacade.create).to.equal('function');
        done();
    });

    it('create() should create a bid on database', function (done) {

        let bid = {
            auctionId: 9999,
            userId: 'userIdTest',
            bid: 99.99,
            date: new Date(),
            isDeleted: false
        };

        bidsFacade.create(bid).then((resolution) => {
            bidToSearch = resolution.dataValues.bidId;
            auctionToSearch = resolution.dataValues.auctionId;
            expect(resolution.dataValues.auctionId).to.equal(9999);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('readAll() should be a function', function (done) {

        expect(typeof bidsFacade.readAll).to.equal('function');
        done();
    });

    it('readAll() should return all bids based on rule passed by param', function (done) {

        let where = {
            userId: 'userIdTest'
        };

        bidsFacade.readAll(where).then((resolution) => {
            expect(resolution[0].dataValues.userId).to.equal('userIdTest');
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('readMax() should be a function', function (done) {

        expect(typeof bidsFacade.readMax).to.equal('function');
        done();
    });

    it('readMax() should return the value of greater bid', function (done) {

        bidsFacade.readMax(auctionToSearch).then((resolution) => {
            expect(typeof resolution).to.equal('number');
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('update() should be a function', function (done) {

        expect(typeof bidsFacade.update).to.equal('function');
        done();
    });

    it('update() should update a bid on database', function (done) {

        let bid = {
            bidId: bidToSearch,
            auctionId: 9999,
            userId: 'userIdTest1',
            bid: 99.99,
            date: new Date(),
            isDeleted: false
        };

        bidsFacade.update(bid).then((resolution) => {
            expect(resolution[0]).to.equal(1);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

});
