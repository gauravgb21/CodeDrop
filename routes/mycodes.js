var express = require('express');
var router  = express.Router();
var db      = require('../mysql_database/db');

router.use(function(req,res){
  var username = req.user.username;
  db.query("SELECT * from `compilations` WHERE `username` = '"+username+"' ORDER BY `creation` DESC",function(err,row){
   	if(err)
   		throw err;
   	else
   	{
   		res.render('mycodes',{
			 strcodes : row,
			 currentPage : 'mycodes' 
        });
   	}
   });  	
});

module.exports = router;
