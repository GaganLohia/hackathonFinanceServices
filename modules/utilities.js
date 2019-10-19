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
    const accountSid = 'ACe42ffb9911add5da826323690e98b36b';
    const authToken = '2de20db51b93b035927a6e3fa76a9f8a';
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