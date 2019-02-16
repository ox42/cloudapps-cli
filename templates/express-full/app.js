var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var hasha = require('hasha');
var passport = require('passport');
var cookieSession = require('cookie-session');
var LocalStrategy = require('passport-local').Strategy;

var path = require('path');
var logger = require('morgan');
var createError = require('http-errors');

var app = express();

var init = require('./init.js');
init.run();

// view engine setup
app.set('views', path.join(__dirname, 'build/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
  name: 'express-app-session',
  maxAge: 30 * 24 * 60 * 60 * 1000,

  keys: [ config.SECRET_SALT ]
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'

}, function(username, password, done) {

  let passwordMD5 = hasha(password, { algorithm: 'md5' });
  let encryptedPassword = hasha(config.SECRET_SALT + passwordMD5);

  Promise.resolve(
      models.Account.findOne({ where: { email: _.trim(username.toLowerCase()) }, raw: true })

  ).then(function(user) {

    if (!user || user.password !== encryptedPassword) {
      return done(null, false);
    }

    //else, successful login
    return done(null, user);
  });
}));


passport.serializeUser(function(user, done) {

  done(null, {
    id: user.id
  });
});

passport.deserializeUser(function(userData, done) {

  models.Account.findOne({where: { id: userData.id }, raw: true })

      .then(async function(user){
        return done(null, user);

      })
      .catch((err) => {

        //should never happen, because we store the data in a secure cookie
        done(null, false);
      });
});


app.use(function(req, res, next) {
  res.locals.APP_NAME = config.APP_NAME;
  res.locals.user = (req && req.user) ? req.user : undefined;
  next();
});


var indexRouter = require('./routes/index');
app.use('/', indexRouter);

var authRouter = require('./routes/auth');
app.use('/auth', authRouter);

var userRouter = require('./routes/user');
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err) {
    //print the error
    console.error(err);
  }

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
