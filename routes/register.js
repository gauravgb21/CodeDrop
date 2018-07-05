var express = require('express');
var router  = express.Router();

// render view for register

router.use(function(req,res){
   res.render('register');
});

module.exports = router;