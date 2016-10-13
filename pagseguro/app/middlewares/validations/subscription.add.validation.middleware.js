function hasRequiredSubscriptionAddFields(req, res, next) {
    var errorMessages = [];
    if (req.body) {

        if (!req.body.redirectUrl) {
            errorMessages.push('Missing field redirectUrl');
        }

        if (!req.body.reviewUrl) {
            errorMessages.push('Missing field reviewUrl');
        }

        if (!req.body.reference) {
            errorMessages.push('Missing field reference');
        }

        if (!req.body.name) {
            errorMessages.push('Missing field name');
        }

        if (!req.body.details) {
            errorMessages.push('Missing field details');
        }

        if (!req.body.amountPerPayment) {
            errorMessages.push('Missing field amountPerPayment');
        }

        if (!req.body.period) {
            errorMessages.push('Missing field period');
        }
    } else {
        errorMessages.push('Required fields needed -> redirectUrl, reviewUrl, reference, name, details, amountPerPayment, period');
    }

    if (errorMessages.length > 0) {
        res.send(400, {errors: errorMessages});
    } else {
        next();
    }

}

exports.hasRequiredSubscriptionAddFields = hasRequiredSubscriptionAddFields;