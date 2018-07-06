var express = require('express');
var router  = express.Router();
var db      = require('../mysql_database/db');

//store user data in database

router.use(function(req,res){
  var name      = req.body.name.toLowerCase();
  var username  = req.body.username;
  var password1 = req.body.password1;
  var password2 = req.body.password2;
  
  // validate user data
  req.checkBody('name','Name is required').notEmpty();
  req.checkBody('username','Username is required').notEmpty();
  req.checkBody('password1','Password is required').notEmpty();
  req.checkBody('password2','Confirm Password field can not be empty').notEmpty();
  req.checkBody('password2','Passwords do not match').equals(req.body.password1);
  var errors = req.validationErrors();
  if(errors)
  {
  	res.render('register',{
      errors:errors
  	});
  }
  else
  {
    var user={
     name:name,
     username:username,
     password:password1
    };
    db.query('INSERT INTO users SET ?',user,function(error,results,fields){
      if(error)
        throw error;
      else
      {
        console.log("NEW RECORD ADDED!");
      }
    });
  	res.redirect('/');
  }
});

module.exports = router;