'use strict';
var moment = require( 'moment' );
var defaultRedirectURL = '';
var defaultReviewURL = '';


var defaultReference = 'GREG1234';
var defaultCharge = 'auto';
var defaultDetails = 'Test plan';
var defaultName = 'Subscription name';
var defaultAmountPerPayment = 9.99;
var defaultPeriod = 'Monthly';


function getModel(redirectUrl,
                  reviewUrl,
                  reference,
                  charge,
                  name,
                  details,
                  amountPerPayment,
                  period) {
    var expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24 * 365);
    return {
        redirectURL: redirectUrl,
        reviewURL: reviewUrl,
        reference: reference ? reference : defaultReference,
        preApproval: {
            charge: charge ? charge : defaultCharge,
            name: name ? name : defaultName,
            details: details ? details : defaultDetails,
            amountPerPayment: amountPerPayment ? amountPerPayment : defaultAmountPerPayment,
            period: period ? period : defaultPeriod,
            finalDate: moment.utc( expiresAt ).format(),
            maxTotalAmount: defaultAmountPerPayment * 12
        }
    };
}

exports.getModel = getModel;