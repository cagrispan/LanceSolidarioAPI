'use strict';

var expect = require('chai').expect;
var usersFacade = require('./../../../../src/models/facades/UsersFacade');
var q = require('q');
var facebookIdToSearh;
var makeId = require('./../../../makeId');

describe('UsersFacade Tests', function () {

    it('findOrCreate() should be a function', function (done) {

        expect(typeof usersFacade.findOrCreate).to.equal('function');
        done();
    });

    it('findOrCreate() should create an user on database', function (done) {

        let user = {
            facebookToken: 'facebookToken'+makeId(),
            facebookId: 'facebookId'+makeId(),
            birthday: new Date(),
            name: 'name',
            token: 'token'+makeId()
        };

        facebookIdToSearh = user.facebookId;

        usersFacade.findOrCreate(user).then((result) => {
            expect(result[0].dataValues.name).to.equal('name');
            done();
        }).catch((err) => {
            console.log(err);
        });

    });

    it('read() should be a function', function (done) {

        expect(typeof usersFacade.read).to.equal('function');
        done();
    });

    it('read() should return an user on database', function (done) {

        usersFacade.read(facebookIdToSearh).then((result) => {
            expect(result.dataValues.name).to.equal('name');
            done();
        }).catch((err) => {
            console.log(err);
        });

    });

    it('update() should be a function', function (done) {

        expect(typeof usersFacade.update).to.equal('function');
        done();
    });

    it('update() should create an user on database', function (done) {

        let user = {
            facebookToken: 'facebookToken'+makeId(),
            facebookId: facebookIdToSearh,
            birthday: new Date(),
            name: 'name1',
            token: 'token'+makeId()
        };


        usersFacade.update(user).then((result) => {
            console.log(result);
            expect(result[0]).to.equal(1);
            done();
        }).catch((err) => {
            console.log(err);
        });

    });


});
