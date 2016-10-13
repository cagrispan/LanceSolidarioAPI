'use strict';
var QueryUtil = require('@tunts/query-util');
function PaymentDAO() {

    var dataSource = require('../database/connection');

    var query = new QueryUtil(dataSource);

    this.insert = function (payment) {
        return query.execQuery('INSERT INTO payment (code, email, status, amount, reference, type, created_at, modified_at) \
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
            payment.code,
            payment.email,
            payment.status,
            payment.amount,
            payment.reference,
            payment.type,
            payment.createdAt,
            payment.modifiedAt
        ]);
    };


    this.getByCode = function (code) {
        return query.execQuery('SELECT * FROM payment WHERE code = ?', [code]);
    };

    this.getByEmail = function (email) {
        return query.execQuery('SELECT * FROM payment WHERE email = ?', [email]);
    };

    this.list = function (limit, offset) {
        return query.execQuery('SELECT * FROM payment LIMIT ? OFFSET ?', [limit, offset]);
    };

    this.update = function (payment) {
        return query.execQuery('UPDATE payment SET \
        email = ?, code = ?, status = ?, amount = ?, reference = ?, type = ?, created_at = ?,  modified_at = ? WHERE code = ?', [
            payment.email,
            payment.code,
            payment.status,
            payment.amount,
            payment.reference,
            payment.type,
            payment.createdAt,
            payment.modifiedAt,
            payment.code
        ]);
    };

}
PaymentDAO.constructor = PaymentDAO;
module.exports = PaymentDAO;