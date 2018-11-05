var express = require('express');
var router = express.Router();
var IncubadoraService = require('../service/incubadoraService');
var Incubadora = require('../models/incubadora');

var incubadoraService = new IncubadoraService();

router.get('/',function(req,res){
    res.render('incubadoras');
});

router.get('/create',function(req,res){

    res.render('incubadoras/create');
});




// GET - create incubadora 
router.get('/create', function (req, res, next) {

res.render('incubadoras/create')
      
    });
    
 //POST Adiciona Incubadora
router.post('/create', function (req, res, next) {
          
var incubadora = new Incubadora();
    
incubadora.status = 0;
incubadora.local = req.body.local;
    
incubadoraService.postIncubadora(incubadora).then((resultado)=>{
    
res.redirect('/incubadoras/');
    
  }); 
});

module.exports = router;
