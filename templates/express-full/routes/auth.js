var express = require('express');
var helpers = require('./helpers');
var router = express.Router();

var hasha = require('hasha');
var chance = require('chance').Chance();
var passport = require('passport');

router.get('/login', helpers.verifyUnauthorized, asyncWrap(async (req, res) => {

  return res.render('login');
}));

router.post('/login', passport.authenticate('local'), asyncWrap(async (req, res) => {

  return res.json({ status: 'Success' });
}));




router.get('/signup', helpers.verifyUnauthorized, asyncWrap(async (req, res) => {

  return res.render('signup');
}));

router.post('/signup', helpers.verifyUnauthorized, asyncWrap(async (req, res) => {

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  let data = {
    name: req.body.name ? _.trim(req.body.name) : '',
    email: req.body.email ? _.trim(req.body.email) : '',
    password: req.body.password ? _.trim(req.body.password) : '',
    password2: req.body.password2 ? _.trim(req.body.password2) : ''
  };

  if (!data.name || !data.email || !data.password || !data.password2) {
    return res.status(400).send({ message: 'Invalid data. Please complete all fields and try again.'});
  }

  if (!validateEmail(data.email)) {
    return res.status(400).send({ message: 'Invalid email. Please try again.'});
  }

  if (data.password.length < 6) {
    return res.status(400).send({ message: 'Please enter a password with at least 6 characters.'});
  }

  if (data.password !== data.password2) {
    return res.status(400).send({ message: 'You must enter your password twice.'});
  }


  data.email = data.email.toLowerCase();
  let existingUserByEmailAddress = await models.Account.findOne({ where: { email: data.email.toLowerCase() }, raw: true });
  if (existingUserByEmailAddress) {
    return res.status(400).send({ message: 'An account with that email address already exists.'});
  }

  let passwordMD5 = hasha(data.password, { algorithm: 'md5' });
  let encryptedPassword = hasha(config.SECRET_SALT + passwordMD5);

  let user = await models.Account.create({
    name: data.email,
    email: data.email,
    password: encryptedPassword,

    token: chance.string({length: 25, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'})
  });


  req.login(user, () => {
    return res.json({ status: 'Success' });
  });
}));



router.post('/logout', helpers.verifyAuthorized, asyncWrap(async (req, res) => {

  req.logout();
  return res.json({ status: 'Success' });
}));


module.exports = router;
