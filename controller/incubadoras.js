var express = require('express');
var router = express.Router();


router.get('/',function(req,res){
    res.render('incubadoras');
});

router.get('/create',function(req,res){

    res.render('incubadoras/create');
});

module.exports = router;