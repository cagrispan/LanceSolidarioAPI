var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport('smtps://totheworldgroup%40gmail.com:albrcalu@smtp.gmail.com');

var sendEmail = function(receiver, subject, text, callback) {
    var mailOptions = {
        from: '2W Group', // sender address
        to: receiver, // list of receivers
        subject: subject, // Subject line
        text: text
    };

    // send mail with defined transport object
    return transporter.sendMail(mailOptions, callback);
};

module.exports = sendEmail;

