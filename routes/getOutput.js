var express = require('express');
var router  = express.Router();
var db      = require('../mysql_database/db');

router.use(function(req,res){
   var username=req.user.username;
   db.query("SELECT * from `compilations` WHERE `username` = '"+username+"'",function(err,row){
   	if(err)
   		throw err;
   	else
   	{
   		var index = row.length-1;
         var out   ={
           output:row[index].output.toString('utf8'),
           time:row[index].execution_time,
           memory:row[index].memory,
           verdict:row[index].verdict
         };
   		res.send(JSON.stringify(out));
   	}
   });  
});

module.exports = router;