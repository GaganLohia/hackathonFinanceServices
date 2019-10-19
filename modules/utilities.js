var path        = require('path'),
    jwt         = require('jsonwebtoken'),
    config      = require(path.resolve( __dirname, "../config.js" ));

var isTokenValid = function(req, res, next){
    var token = req.headers.token;
    if(token){
        var valid = false;
        jwt.verify(token, config.secretKey, (err, decoded) => {
            if(err==null){
                valid = true;
            }
        });
        if(valid){
            return next();
        } else{
            return sendResponse(res, 401, false, 'Session Expired!');
        }
    } else {
        return sendResponse(res, 403, false, 'Token not provided!');
    }
}

var sendResponse = function(resObj, status, success, msg, extraParams = {}){
    var responseObj = {
        success : success,
        msg     : msg,
    };
    responseObj = Object.assign(responseObj, extraParams);
    resObj.status(status).send(responseObj);
}
var sendSms = function (to, msg) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: msg,
            from: '+12054650327',
            to: '+91'+to
        })
        .then(message => console.log(message.sid))
        .done();
}
module.exports = {
    isTokenValid : isTokenValid,
    sendResponse : sendResponse,
    sendSms     : sendSms
};