var express          = require('express');
var path             = require('path');
var cookieParser     = require('cookie-parser');
var bodyParser       = require('body-parser');
var exphbs           = require('express-handlebars');
var expressValidator = require('express-validator');
var flash            = require('connect-flash');
var session          = require('express-session');
var Handlebars       = require('handlebars');
var HandlebarsIntl   = require('handlebars-intl');
var PORT             = 8082;
var db               = require('./mysql_database/db');

// Init app
var app = express();


//routes
var login          = require('./routes/login');
var register       = require('./routes/register');
var user_registers = require('./routes/user_registers');
var user_login     = require('./routes/user_login');
var dashboard      = require('./routes/dashboard');
//view Engine
HandlebarsIntl.registerWith(Handlebars);
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.set('view engine','handlebars');


//bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//static folders
app.use(express.static(path.join(__dirname,'public')));


app.use(cookieParser());
//Express sessions
app.use(session({
 secret: 'secret',
 saveUninitialized: true,
 resave: true
}));

//Express Validators
app.use(expressValidator({
errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//connect flash
app.use(flash());

//Global Variables
app.use(function(req,res,next){
res.locals.success_msg=req.flash('success_msg');
res.locals.error_msg=req.flash('error_msg');
res.locals.error=req.flash('error');
res.locals.user=req.user||null;
//console.log(res.locals.user);
next();
});


//connect routes middlewares
app.use('/',login);
app.use('/register',register);
app.use('/users_register',user_registers);
app.use('/users_login',user_login);
app.use('/dashboard',dashboard);
//connect app 

app.listen(PORT,function(){
	console.log('server is listing to 8082');
});
