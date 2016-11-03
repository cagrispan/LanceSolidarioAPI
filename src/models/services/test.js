var sendEmail = require('./email.service');

var receiver = 'brunofaczz2@gmail.com';
var subject = 'test';
var text = 'testezão';

sendEmail(receiver, subject, text);
