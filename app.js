var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function (err) {
        return done(err);
      });
  }))

require('dotenv').config();
const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
// passport config
// Use the existing connection
// The Account model
var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//Bind connection to error event

db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function () { console.log("Connection to DB succeeded") });

var resourceRouter = require('./routes/resource');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var Drink = require('./models/Drink');
var drinksRouter = require('./routes/Drink');
var boardRouter = require('./routes/board');
var selectorRouter = require('./routes/selector');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/drink', drinksRouter);
app.use('/board', boardRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);




async function recreateDB() {
  // Delete everything
  await Drink.deleteMany();

  let instance1 = new
    Drink({ drink_type: "Coke", drink_size: "large", drink_cost: 300 });
  instance1.save().then(() => {
    console.log('First Object is created');
  }).catch((e) => {
    console.log('There was an error', e.message);
  });
  let instance2 = new
    Drink({ drink_type: "Pepsi", drink_size: "med", drink_cost: 150 });
  instance2.save().then(() => {
    console.log('Second Object is created');
  }).catch((e) => {
    console.log('There was an error', e.message);
  });
  let instance3 = new
    Drink({drink_type: "Fanta", drink_size: "small", drink_cost: 100 });
  instance3.save().then(() => {
    console.log('Third Object is created');
  }).catch((e) => {
    console.log('There was an error', e.message);
  });
}

let reseed = false;
if (reseed) { recreateDB(); }

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


