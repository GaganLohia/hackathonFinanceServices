var path = require('path'),
    models = require(path.resolve(__dirname, "../models/schema.js")),
    utils = require(path.resolve(__dirname, "./utilities")),
    Group = models.Group,
    FinanceTransaction = models.FinanceTransaction,
    User = models.User
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

var getAllTransactions = function(req,res){
    var userName = req.query.userName;
    FinanceTransaction.find({
        usersName : userName
     }, function (err, Transactions) {
         if (err) {
             console.log(err);
             utils.sendResponse(res, 500, false, 'Please try again later.');
         } else {
             var params = {
                 Transactions: Transactions
             };
             utils.sendResponse(res, 200, true, '', params);
         }
     });
};

var makeTransactions = function(req,res){
    var transactionName = req.body.transactionName,
        transactionType = req.body.transactionType,
        groupName       = req.body.groupName,
        amount          = req.body.amount,
        usersName       = req.body.memberNames.split('~'),
        usersNumber     = req.body.memberNumbers.split('~'),
        userName        = req.body.userName,
        payeeUserName   = req.body.payeeUserName;
        usersName.push(userName);

    var trans   = new FinanceTransaction({
        transactionName : transactionName,
        transactionType : transactionType,
        usersName       : usersName,
        amount          : amount,
        payeeUserName   : payeeUserName,
        groupName       : groupName,
        userName        : userName
    });
    trans.save(function (err) {
        if (err) {
            utils.sendResponse(res, 500, false, 'Please try again later.');
        } else {
            for(var i =0; i<usersNumber.length; i++){
                sendMessage(usersNumber[i], usersName[i], (amount*1.0)/usersNumber.length, groupName, transactionName);
            }
            User.find({
                username : {$in:usersName}
            },function(err,Users){
                if(err){

                }else{
                    var amountToBeDeducted = (amount*1.0)/usersNumber.length;
                    for(var i=0; i<Users.length; i++){
                        User.updateOne({_id : Users[i]._id},{
                            $set: {
                                "username":Users[i].username,
	                            "password":Users[i].password,
                                "phonenumber" :Users[i].phonenumber,
                                "accountBalance":Users[i].accountBalance - amountToBeDeducted
                            }
                        },function (err, obj) {
                            if (err) {
                                console.log(err);
                                utils.sendResponse(res, 500, false, 'Please try again later.');
                            }
                            else {
                                //utils.sendResponse(res, 200, true, 'User updated successfully.');
                            }
                        }
                            )
                    }
                    console.log(Users);
                }
            }
            
            );
            utils.sendResponse(res, 200, true, 'Transaction added successfully.',{id:trans._id});
        }
    });
}

var sendMessage = function(to,username,value,groupName,transactionName){
    var msg = "Hi " + username +", Your accout has been debited by Rs."+value + " for transaction: "+ transactionName +" in group: "+ groupName;
    utils.sendSms(to,msg);
}

module.exports = {
    addNewGroup : addNewGroup,
    getGroupsByUserName : getGroupsByUserName,
    makeTransactions    : makeTransactions,
    getAllTransactions  : getAllTransactions
};