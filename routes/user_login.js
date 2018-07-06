var express = require('express');
var router  = express.Router();
var db      = require('../mysql_database/db');

router.use(function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  db.query('SELECT * FROM users WHERE username = ?',[username],function(error,results,fields){
  	if(error)
  		throw error;
  	else
  	{
  		if(results.length>0)
  		{
  		  if(results[0].password==password)
  		  {
  		  	//authentication sucessfull
          var user={
            name:results[0].name,
            username:results[0].username
          }
          res.locals.user=user;
  		  	res.render('dashboard');
          //console.log(res.user);
  		  }
  		  else
  		  {
          var errors=[{
            msg:"password is incorrect"
          }];
  		  	res.render('login',{
            errors:errors
          });
  		  }	
  		}
  		else
  		{
        var errors=[{
            msg:"Username is not registered"
          }];
  			res.render('login',{
              errors:errors
  			});
  		}
  	} 
  });	
});

module.exports = router;