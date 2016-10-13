

function decodeUriToNotificationObject(req, res, next){
    var params = JSON.parse('{"' + decodeURI(req.body.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');

    if(params && params.notificationCode && params.notificationType){
        req.notification = {
            code : params.notificationCode,
            type : params.notificationType
        };
    }else{
        req.notification = {
            code : '',
            type : ''
        };
    }

    next();
}

exports.decodeUriToNotificationObject = decodeUriToNotificationObject;
