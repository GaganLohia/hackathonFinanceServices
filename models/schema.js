var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var transactionSchema = new Schema({
    transactionFromId     : [{type: mongoose.Schema.Types.ObjectId}],
    transactionToId       : {type: mongoose.Schema.Types.ObjectId, required: true, ref : 'User'},
    transactionValue    : {type: Number, required: true},
    transactionDate     : {type: Date, default:Date.now()},
    transactionName     : { type: String, required: true },
    transactionCategory : { type: String, required: true },
});
var userSchema = new Schema({ 
    username                : { type: String, required: true, unique: true }, 
    password                : { type: String, required: true },
    accountBalance          : { type: Number, default : 1100000},
    phoneNumber             : { type: Number, required: true}
});
var groupSchema = new Schema({
    usersName : [{type: String}],
    groupName : {type : String},
});
var requestSchema = new Schema({
    
});
userSchema.plugin(uniqueValidator);
module.exports = {
    User                    : mongoose.model('User', userSchema),
    Transaction             : mongoose.model('Transaction', transactionSchema),
    Group                   : mongoose.model('Group', groupSchema)
};
