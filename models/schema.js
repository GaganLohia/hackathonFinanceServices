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
    groupName : {type : String,unique: true},
});
var financeTransaction = new Schema({
    transactionName : {type:String,required: true},
    transactionType : {type:String,required: true},
    usersName       : [{type:String}],
    amount          : {type:Number,required:true},
    payeeUserName   : {type:String,required:true},
    groupName       : {type:String,required:true},
    userName        : {type:String,required:true}
})
var requestSchema = new Schema({
    
});

var offer = new Schema({
    offerId         : [{ type: mongoose.Schema.Types.ObjectId}],
    placeName       : { type: String, required: true },
    latitude        : { type: Number , required : true},
    longitude       : { type: Number, required: true},
    createdTime     : { type: Date, default:Date.now()},
    offerCategory   : { type: String, required: true },
});

userSchema.plugin(uniqueValidator);
module.exports = {
    User                    : mongoose.model('User', userSchema),
    Transaction             : mongoose.model('Transaction', transactionSchema),
    Group                   : mongoose.model('Group', groupSchema),
    FinanceTransaction      : mongoose.model('FinanceTransaction', financeTransaction),
    offer                   : mongoose.model('Offer', offer)
};
