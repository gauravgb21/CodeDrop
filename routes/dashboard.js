var express = require('express');
var router  = express.Router();

//Display dashboard

router.use(function(req,res){
  //set user object here as well  
    res.render('dashboard',{
      currentPage : 'dashboard'      
    });
});

module.exports = router;