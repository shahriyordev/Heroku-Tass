const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const AddRouter = require('./routes/musicAdd');
const musicRouter = require('./routes/music');
const EditRouter = require('./routes/musicEdit');
const DeleteRouter = require('./routes/musicDelete');

// pages
const Dashboard = require('./routes/dashboard');
const Debug = require('./routes/debug');
const Devices = require('./routes/devices');
const Organization = require('./routes/organization');
const UserRouter = require('./routes//user');

const app = express();

// validatorlar
const flash = require('connect-flash');
const validator = require('express-validator');
const session = require('express-session');
const passport = require('passport');

// express-message
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


// express-sassion 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// validator

app.use(validator({
  errorFormatter: (param, msg, value) => {
    let namespace = param.split('.'),
    root = namespace.shift(),
    formParam = root

    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    }
    return{
      param: formParam,
      msg: msg,
      value: value
    }
  }
}))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const db2 = require('./cf/db');

const mongoose = require('mongoose');
mongoose.connect(db2.db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongodbga local ulandik');
});

// passport js ulash 

require('./cf/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());

// global router yoqish

app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/music', AddRouter);
app.use('/music', musicRouter);
app.use('/music', EditRouter);
app.use('/music', DeleteRouter);

// pages 
app.use('/', Dashboard);
app.use('/', Debug);
app.use('/', Devices);
app.use('/', Organization);
app.use('/', UserRouter);


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

module.exports = app;
