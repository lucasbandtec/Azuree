var express = require('express');
var router = express.Router();


// get index
router.get('/',function(req,res){

    res.render('recemNasc');
});

router.get('/create',function(req,res) {

    res.render('recemNasc/create');
});

module.exports = router;