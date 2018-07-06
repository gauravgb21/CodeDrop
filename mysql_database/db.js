var mysql = require('mysql');

//connection to database

var con = mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'password',
   database:'code_drop' 
});

con.connect(function(err){
   if(err)
   	throw err;
   console.log("connected to database");
});

module.exports=con;
