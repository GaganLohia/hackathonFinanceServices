var path = require('path'),
    models = require(path.resolve(__dirname, "../models/schema.js")),
    utils = require(path.resolve(__dirname, "./utilities")),
    User = models.User;

    var getAllUsers = function(req,res){
        User.find({}, "username phoneNumber",
            function (err, Users) {
            if (err) {
                console.log(err);
                utils.sendResponse(res, 500, false, 'Please try again later.');
            } else {
                var params = {
                    Users: Users
                };
                utils.sendResponse(res, 200, true, '', params);
            }
        }).select('username');
    };

    var getAccountInfo = function(req,res){
        var userName = req.query.userName;
        User.findOne({
            username : userName
        }, "accountBalance phoneNumber username",
            function (err, Users) {
            if (err) {
                console.log(err);
                utils.sendResponse(res, 500, false, 'Please try again later.');
            } else {
                var params = {
                    User: Users
                };
                utils.sendResponse(res, 200, true, '', params);
            }
        });
    }; 
    
    module.exports = {
        getAllUsers : getAllUsers,
        getAccountInfo : getAccountInfo
    };