var express = require('express');
var router  = express.Router();

router.use(function(req,res){
  req.logout();
  res.redirect('/');
});

module.exports = router;