var express         = require('express');
var router          = express.Router();
var db              = require('../mysql_database/db');
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var passportConfig  = require('./passport.js');


passportConfig(passport);
router.use(passport.initialize());
router.use(passport.session());

router.use('',
  passport.authenticate('local-login',{successRedirect:'/dashboard',failureRedirect:'/',failureFlash:true}),
  function(req, res) {
   res.redirect('/dashboard'); 
  });

module.exports = router;