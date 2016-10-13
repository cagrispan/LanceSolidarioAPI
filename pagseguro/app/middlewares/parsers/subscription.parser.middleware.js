'use strict';
var moment = require('moment');
function parseSubscription(req, res, next) {
    var expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24 * 365);
    req.subscription = {
        'redirectUrl': req.body.redirectUrl,
        'reviewUrl': req.body.reviewUrl,
        'reference': req.body.reference,
        'preApproval': {
            'charge': 'auto',
            'name': req.body.name,
            'details': req.body.details,
            'amountPerPayment': req.body.amountPerPayment,
            'period': req.body.period,
            finalDate: moment.utc(expiresAt).format(),
            maxTotalAmount:  req.body.amountPerPayment * 12
        }
    };
    next();
}
exports.parseSubscription = parseSubscription;