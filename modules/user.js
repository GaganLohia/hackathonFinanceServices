var path = require('path'),
    models = require(path.resolve(__dirname, "../models/schema.js")),
    utils = require(path.resolve(__dirname, "./utilities")),
    User = models.User;

    var getAllUsers = function(req,res){
        User.find({}, 
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
    
    module.exports = {
        getAllUsers : getAllUsers
    };