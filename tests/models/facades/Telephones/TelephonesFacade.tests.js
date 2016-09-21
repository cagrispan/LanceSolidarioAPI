'use strict';

var expect = require('chai').expect;
var telephonesFacade = require('./../../../../src/models/facades/TelephonesFacade');
var q = require('q');
var telephoneToSearch;
var userToSearch;

describe('TelephonesFacade Tests', function () {

    it('create() should be a function', function (done) {

        expect(typeof telephonesFacade.create).to.equal('function');
        done();
    });

    it('create() should create a telephone on database', function (done) {

        let telephone = {
            userId: 'userIdTest',
            telephone: 'telephoneTest'
        };

        telephonesFacade.create(telephone).then((resolution) => {
            telephoneToSearch = resolution.dataValues.telephoneId;
            userToSearch = resolution.dataValues.userId;
            expect(resolution.dataValues.telephone).to.equal('telephoneTest');
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('readAll() should be a function', function (done) {

        expect(typeof telephonesFacade.readAll).to.equal('function');
        done();
    });

    it('readAll() should return all telephones from an user', function (done) {

        telephonesFacade.readAll(userToSearch).then((resolution) => {
            expect(resolution[0].dataValues.userId).to.equal(userToSearch);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('update() should be a function', function (done) {

        expect(typeof telephonesFacade.update).to.equal('function');
        done();
    });

    it('update() should update a telephone on database', function (done) {

        let telephone = {
            telephoneId: telephoneToSearch,
            userId: 'userIdTest',
            telephone: 'telephoneTest'
        };

        telephonesFacade.update(telephone).then((resolution) => {
            expect(resolution[0]).to.equal(1);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('remove() should be a function', function (done) {

        expect(typeof telephonesFacade.remove).to.equal('function');
        done();
    });

    it('remove() should remove a telephone from database', function (done) {

        let telephone = {
            telephoneId: telephoneToSearch,
            userId: 'userIdTest',
            telephone: 'telephoneTest'
        };

        telephonesFacade.remove(telephone).then((resolution) => {
            expect(resolution.dataValues.telephoneId).to.equal(telephoneToSearch);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

});
