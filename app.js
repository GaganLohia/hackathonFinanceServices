var app             = require('express')(),
    bodyParser      = require('body-parser'),
    morgan          = require('morgan'),
    path            = require('path'),
    Authenticate    = require(path.resolve(__dirname,"./modules/authenticate.js")),
    Transactions    = require(path.resolve(__dirname,"./modules/transaction.js")),
    InitDb          = require(path.resolve(__dirname,"./modules/initDb.js")),
    utils           = require(path.resolve(__dirname, "./modules/utilities" )),
    FinanceServices = require(path.resolve(__dirname, "./modules/financeServices.js")),
    User            = require(path.resolve(__dirname, "./modules/user.js")),
    port            = process.env.PORT || 3001;
   // offersNear      = require(path.resolve(__dirname,"./modules/offersnear.js"))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.post('/signup',Authenticate.signUp);
app.post('/signin',Authenticate.signIn);
app.post('/addNewGroup',FinanceServices.addNewGroup);
app.post('/getGroupsByUser', FinanceServices.getGroupsByUserName);
app.post('/makeTransaction', FinanceServices.makeTransactions);
app.get('/getAllUsers',User.getAllUsers);
app.get('/getAccountInfo', User.getAccountInfo)
app.get('/getAllTransactions',utils.isTokenValid,Transactions.getAllTransactions);
app.post('/updateTransaction',utils.isTokenValid,Transactions.updateTransaction);
app.delete('/deleteTransaction',utils.isTokenValid,Transactions.deleteTransaction);
// app.get('/addOffers', offersNear.addOffers);
// app.get('/getoffersByName',offersNear.getoffersByName);
// app.get('/getOffersByLocation' , offersNear.getOffersByLocation);
app.get('/', (req,res)=>{
    res.send('This is Api End-point for Expense Manager');
});
app.use('/*',(req,res)=>{
    utils.sendResponse(res, 404, false, 'Not Found');
})
app.listen(port,()=>{
    console.log('Listening to Port ' + port);
    InitDb.init();
});