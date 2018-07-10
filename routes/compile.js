var express     = require('express');
var router      = express.Router();
var fs          = require('fs');
var db          = require('../mysql_database/db');
var path        = require('path');
var sh          = require('child_process');
var performance = require('perf_hooks').performance;
router.use(function(req,res){
var day   = new Date().getDate();
var month = new Date().getMonth();
var year  = new Date().getFullYear();
var hour  = new Date().getHours();
var min   = new Date().getMinutes();
var sec   = new Date().getSeconds();
var code  = req.body.code;
var input = req.body.input;
var lang  = req.body.lang.toString();
input     = input.replace(/\n/g, "\r\n");
fs.writeFileSync('../CodeDrop/codes/test.cpp',code.toString());
fs.writeFileSync('../CodeDrop/codes/input.txt',input.toString());
var reqpath = path.join(__dirname,'../');
var newpath = reqpath;
reqpath     = path.join(reqpath,'/codes/');
var command = "g++ -o test "+reqpath+"test.cpp&test.exe";
var child   = sh.spawnSync(command,{shell: true});
  
var op;
var verdict;
var execution_time=0;
if(child.stderr.toString().length!=0)
  op = child.output[2].toString();
else if(input.toString().length==0)
  op = child.output[1].toString();
  

if(child.stderr.toString().length==0 && input.toString().length!=0)
{
  var newcmd   = newpath + "test < ./codes/input.txt";
  var start    = performance.now(); 
  var child1   = sh.spawnSync(newcmd,{shell: true});
  console.log(child1.output[1].toString());
  var end      = performance.now();
  console.log("execution time is----  ");
  console.log((end-start)/1000);
  execution_time = (end-start);
  if(child1.stderr.toString().length==0){
    op      = child1.output[1].toString();
    verdict = "Accepted"; 
  }
  else
  {
    op      = child1.output[2].toString();
    verdict = "Runtime Error";
  }
}
else if(child.stderr.toString().length!=0)
{
  verdict = "Compilation Error";
}

var cdate = year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec; 
var compilation={
	username:req.user.username,
	code:code,
	input:input,
	creation:cdate,
	lang:lang,
  verdict:verdict,
	execution_time:execution_time,
	memory:23,
	output:op
};
  
db.query('INSERT INTO compilations SET ?',compilation,function(error,results,fields){
	if(error)
		throw error;
	else
	{
		console.log("compilation added");
  	}
  });
});

module.exports = router;