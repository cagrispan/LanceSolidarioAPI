'use strict';
var PaymentDAO = require('../daos/payment.dao'),
    paymentDAO = new PaymentDAO();

function Payment() {

    var self = this;
    self.code = null;
    self.email = null;
    self.status = null;
    self.amount = null;
    self.createdAt = null;
    self.modifiedAt = null;
    self.reference = null;
    self.type = null;

    this.insert = function () {
        return paymentDAO.insert(this).then(function (resolution) {
            return resolution[0];
        });
    };

    this.update = function () {
        return paymentDAO.update(this).then(function (resolution) {
            return resolution;
        });
    };

    this.list = function (limit, offset) {
        return paymentDAO.list(limit, offset).then(function (resolution) {
            var payments = [];
            resolution[0].forEach(function (paymentInfo) {
                var payment = new Payment();
                payment.code = paymentInfo.code;
                payment.email = paymentInfo.email;
                payment.status = paymentInfo.status;
                payment.amount = paymentInfo.amount;
                payment.reference = paymentInfo.reference;
                payment.type = paymentInfo.type;
                payment.createdAt = paymentInfo.createdAt;
                payment.modifiedAt = paymentInfo.modifiedAt;
                payments.push(payment);
            });
            return payments;
        });
    };

    this.load = function () {
        return paymentDAO.getByCode(self.code).then(function (resolution) {
            if(resolution[0].length !== 0){
                var payment = resolution[0];
                self.code = payment[0].code;
                self.email = payment[0].email;
                self.status = payment[0].status;
                self.amount = payment[0].amount;
                self.reference = payment[0].reference;
                self.type = payment[0].type;
                self.createdAt = payment[0].createdAt;
                self.modifiedAt = payment[0].modifiedAt;

                return self;
            }else{
                return null;
            }

        });
    };

    this.toJsonString = function(){
        return JSON.stringify({
            code : self.code,
            email : self.email,
            status : self.status,
            amount : self.amount,
            reference : self.reference,
            type : self.type,
            createdAt : self.createdAt,
            modifiedAt : self.modifiedAt
        })
    };

}
Payment.constructor = Payment;
module.exports = Payment;
