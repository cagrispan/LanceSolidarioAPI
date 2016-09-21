'use strict';

var expect = require('chai').expect;
var addressesFacade = require('./../../../../src/models/facades/AddressesFacade');
var q = require('q');
var addressToSearch;

describe('AddressesFacade Tests', function () {


    it('create() should be a function', function (done) {

        expect(typeof addressesFacade.create).to.equal('function');
        done();
    });

    it('create() should create an address on database', function (done) {

        let address = {
            street: 'streetTest',
            number: 'numberTest',
            complement: 'complementTest',
            neighborhood: 'neighborhoodTest',
            city: 'cityTest',
            state: 'stateTest',
            cep: 'cepTest',
            userId: 9999
        };

        addressesFacade.create(address).then((resolution) => {
            addressToSearch = resolution.dataValues.addressId;
            expect(resolution.dataValues.street).to.equal('streetTest');
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('readAll() should be a function', function (done) {

        expect(typeof addressesFacade.readAll).to.equal('function');
        done();
    });

    it('readAll() should return all addresses from an specific user', function (done) {

        let userId = 9999;

        addressesFacade.readAll(userId).then((resolution) => {
            expect(resolution[0].dataValues.street).to.equal('streetTest');
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('update() should be a function', function (done) {

        expect(typeof addressesFacade.update).to.equal('function');
        done();
    });

    it('update() should update an address on database', function (done) {

        let address = {
            addressId: addressToSearch,
            street: 'streetTest',
            number: 'numberTest',
            complement: 'complementTest',
            neighborhood: 'neighborhoodTest',
            city: 'cityTest',
            state: 'stateTest',
            cep: 'cepTest',
            userId: 9999
        };

        addressesFacade.update(address).then((resolution) => {
            expect(resolution[0]).to.equal(1);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('remove() should be a function', function (done) {

        expect(typeof addressesFacade.remove).to.equal('function');
        done();
    });

    it('remove() should remove an address from database', function (done) {

        let address = {
            addressId: addressToSearch,
            street: 'streetTest',
            number: 'numberTest',
            complement: 'complementTest',
            neighborhood: 'neighborhoodTest',
            city: 'cityTest',
            state: 'stateTest',
            cep: 'cepTest',
            userId: 9999
        };

        addressesFacade.remove(address).then((resolution) => {
            expect(resolution.addressId).to.equal(address.addressId);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

});
