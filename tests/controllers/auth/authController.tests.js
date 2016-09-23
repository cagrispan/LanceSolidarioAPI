'use strict';
var expect = require('chai').expect;
var proxyquire = require("proxyquire");
var UserMock = require('./../../models/facades/Users/Users.mock');
var jwtMock = require('./../jwt.mock');
var AuthController = proxyquire('../../../src/controllers/auth/auth.controller.js',
    {'../../models/facades/Users/UsersFacade': UserMock,
    'jsonwebtoken' : jwtMock});
var sinon = require('sinon');

describe('Auth controller Tests', function () {

    var authController = new AuthController();

    it('should be a function', function(done) {
        expect(typeof authController.login).to.equal('function');
        done();
    });

    it('should call res.send(201)', function (done) {
        var req = {
            body: {
                facebookId: 'teste123456',
                birthday: '10/09/1998',
                name: 'testeZao',
                facebookToken: 'tokenTest'
            }
        };

        var res = {send: sinon.spy()};

        authController.login(req, res).then(function () {
            expect(res.send.calledWith(201)).to.equal(true);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });
});

