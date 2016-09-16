'use strict';
function EmailsMiddleware() {

    this.hasAllInformation = function (req, res, next) {

        if (req.body && req.params) {
            if (req.params.facebookId &&
                req.body.email ) {
                next();
            } else {
                res.send(404, {message: "Parameters missing."});
            }
        } else {
            res.send(404, {message: "Parameters missing."});
        }

    };

    this.hasId = function (req, res, next) {

        if (req.params) {
            if (req.params.emailId) {
                next();
            } else {
                res.send(404, {message: "Parameters missing."});
            }
        } else {
            res.send(404, {message: "Parameters missing."});
        }

    };
}
EmailsMiddleware.constructor = EmailsMiddleware;
module.exports = EmailsMiddleware;
