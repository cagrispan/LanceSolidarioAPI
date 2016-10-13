'use strict';

function Payment() {

    var self = this;
    self.redirectUrl = null;
    self.reviewUrl = null;
    self.currency = 'BRL';
    self.items = [];
    self.reference = null;

}
Payment.constructor = Payment;
module.exports = Payment;