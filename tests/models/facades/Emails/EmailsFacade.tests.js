'use strict';

var expect = require('chai').expect;
var emailsFacade = require('./../../../../src/models/facades/EmailsFacade');
var q = require('q');
var emailToSearch;
var userToSearch;

describe('EmailsFacade Tests', function () {

    it('create() should be a function', function (done) {

        expect(typeof emailsFacade.create).to.equal('function');
        done();
    });

    it('create() should create a email on database', function (done) {

        let email = {
            userId: 'userIdTest',
            email: 'emailTest',
        };

        emailsFacade.create(email).then((resolution) => {
            emailToSearch = resolution.dataValues.emailId;
            userToSearch = resolution.dataValues.userId;
            expect(resolution.dataValues.email).to.equal('emailTest');
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('readAll() should be a function', function (done) {

        expect(typeof emailsFacade.readAll).to.equal('function');
        done();
    });

    it('readAll() should return all emails from database', function (done) {

        emailsFacade.readAll(userToSearch).then((resolution) => {
            expect(resolution[0].dataValues.userId).to.equal(userToSearch);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('update() should be a function', function (done) {

        expect(typeof emailsFacade.update).to.equal('function');
        done();
    });

    it('update() should update an email on database', function (done) {

        let email = {
            emailId: emailToSearch,
            userId: 'userIdTest',
            email: 'emailTest',
        };

        emailsFacade.update(email).then((resolution) => {
            expect(resolution[0]).to.equal(1);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('remove() should be a function', function (done) {

        expect(typeof emailsFacade.remove).to.equal('function');
        done();
    });

    it('remove() should remove an email from database', function (done) {

        let email = {
            emailId: emailToSearch,
            userId: 'userIdTest',
            email: 'emailTest',
        };

        emailsFacade.remove(email).then((resolution) => {
            expect(resolution.dataValues.emailId).to.equal(emailToSearch);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

});
