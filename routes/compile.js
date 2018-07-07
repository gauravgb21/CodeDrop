var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var path    = require('path');
var child   = require('child_process');
router.use(function(req,res){
  var code  = req.body.code;
  var input = req.body.input;
  fs.writeFileSync('../CodeDrop/codes/test.cpp',code.toString());
  fs.writeFileSync('../CodeDrop/codes/input.txt',input.toString());
  var reqpath = path.join(__dirname,'../');
  reqpath = path.join(reqpath,'/codes/');
  var command = "g++ -o test "+reqpath+"test.cpp&test.exe";
  var result  = child.execSync(command);
  console.log(result.toString('utf8'));

  //return this output to user 

  res.redirect('/dashboard');
});

module.exports = router;