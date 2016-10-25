

function decodeUriToNotificationObject(req, res, next){
    var params = req.headers;

    if(params && params.notificationcode && params.notificationtype){
        req.notification = {
            code : params.notificationcode,
            type : params.notificationtype
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
