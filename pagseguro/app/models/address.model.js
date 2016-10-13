'use strict';

function Address() {

    var self = this;
    self.street = null;
    self.number = null;
    self.complement = null;
    self.district = null;
    self.postalcode = null;
    self.city = null;
    self.state = null;
    self.country = null;
}
Address.constructor = Address;
module.exports = Address;