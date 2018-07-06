var express = require('express');
var router  = express.Router();

//Display dashboard

router.use(function(req,res){
	//set user object here as well
    var user;
    res.locals.user=user;
    res.render('dashboard');
});

module.exports = router;