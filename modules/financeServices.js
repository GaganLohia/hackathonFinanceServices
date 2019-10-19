var path = require('path'),
    models = require(path.resolve(__dirname, "../models/schema.js")),
    utils = require(path.resolve(__dirname, "./utilities")),
    Group = models.Group

var addNewGroup = function (req, res) {
    console.log(req.body);
    var usersName           = req.body.memberNames.split('~');
    var groupName           = req.body.groupName;
    var userName            = req.body.userName;
    usersName.push(userName);
    console.log(usersName)
    var group = new Group({
        usersName  : usersName,
        groupName  : groupName
    });
    group.save(function (err) {
        if (err) {
            utils.sendResponse(res, 500, false, 'Please try again later.');
        } else {
            utils.sendResponse(res, 200, true, 'Group added successfully.',{id:group._id});
        }
    });
};
var getGroupsByUserName = function(req,res){
    var userName = req.body.userName;
    Group.find({
       usersName : userName
    }, function (err, Groups) {
        if (err) {
            console.log(err);
            utils.sendResponse(res, 500, false, 'Please try again later.');
        } else {
            var params = {
                Groups: Groups
            };
            utils.sendResponse(res, 200, true, '', params);
        }
    });
};

module.exports = {
    addNewGroup : addNewGroup,
    getGroupsByUserName : getGroupsByUserName
};