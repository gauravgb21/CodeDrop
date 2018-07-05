var express = require('express');
var router  = express.Router();

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
  	console.log("GOTCHAAAA!!");
  	res.redirect('/');
  }
});

module.exports = router;