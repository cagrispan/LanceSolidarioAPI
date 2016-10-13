'use strict';

function Item() {

    var self = this;
    self.id = null;
    self.description = null;
    self.amount = 'BRL';
    self.quantity = [];
    self.weight = 0;

}
Item.constructor = Item;
module.exports = Item;