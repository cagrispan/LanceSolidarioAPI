var nodemailer = require('nodemailer');

var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'totheworldgroup@gmail.com',
        pass: 'albrcalu'
    }
};

var transporter = nodemailer.createTransport(smtpConfig);

var sendEmail = function(receiver, subject, html, callback) {
    var mailOptions = {
        from: '2W Group', // sender address
        to: receiver, // list of receivers
        subject: subject, // Subject line
        html: html
        // text: text
    };

    // send mail with defined transport object
    return transporter.sendMail(mailOptions, callback);
};

module.exports = sendEmail;

