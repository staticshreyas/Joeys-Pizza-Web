var createError = require('http-errors');
var express = require('express');
var bodyParser= require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
const validator= require('express-validator');
var MongoStore= require('connect-mongo')(session);
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');



var indexRouter = require('./routes/index');
var userRoutes = require('./routes/user');
var shopRouter =require('./routes/shop');

var app = express();

app.set('port', (process.env.PORT || 5000));


//mongodb://<dbuser>:<dbpassword>@ds035856.mlab.com:35856/heroku_hmc4062j
/*mongoose.connect('mongodb://localhost:27017/shopping',{useNewUrlParser: true, useUnifiedTopology: true});*/
mongoose.connect('mongodb://shreyas_more:z1y2x3w4@ds035856.mlab.com:35856/heroku_hmc4062j',{useNewUrlParser: true, useUnifiedTopology: true});
require('./config/passport');

// view engine setup
app.engine('.hbs',expressHbs(
    {
  defaultLayout: 'layout',
  extname: '.hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}
  ));

app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 10*60*1000}
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use('/shop', shopRouter);
app.use('/user',userRoutes);
app.use('/', indexRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


(async () => {
  const files = await imagemin(['/images/*.{jpg,png}'], {
    destination: '/images',
    plugins: [
      imageminJpegtran({
        quality: [0.6, 0.8]
      })
    ]
  });

  console.log(files);
  //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
})();


app.listen(app.get('port'),function () {
console.log('Node app is running');
});





module.exports = app;
