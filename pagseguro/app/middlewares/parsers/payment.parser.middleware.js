'use strict';

function getItems(items) {
    var parsedItems = [];
    for (var i = 0; i < items.length; i++) {
        parsedItems.push({
            id: items[i].id,
            amount: items[i].amount,
            description: items[i].description,
            quantity: items[i].quantity
        })
    }
    return {item:parsedItems};
}

function parsePayment(req, res, next) {
    req.payment = {
        'redirectUrl': req.body.redirectUrl,
        'reviewUrl': req.body.reviewUrl,
        'reference': req.body.reference,
        'currency': req.body.currency,
        'items': getItems(req.body.items)
    };
    next();
}
exports.parsePayment = parsePayment;