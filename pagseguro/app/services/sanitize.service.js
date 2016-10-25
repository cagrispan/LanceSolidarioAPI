'use strict';

function sanitizeTransaction(transactionData) {
    try {
        var sanitizedObject = transactionData;
        delete sanitizedObject['gatewaySystem'];
        return sanitizedObject;
    } catch (e) {
        console.log(e);
        return {};
    }

}

exports.sanitizeTransaction = sanitizeTransaction;