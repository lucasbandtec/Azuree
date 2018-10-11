var express = require('express');
var router = express.Router(); 
var Incubadoras = require('../service/incubadoraService');

/* GET home page. */
router.get('/', function(req, res, next) {
 // res.render('index', { title: 'Express' });

  var incubadoras = new Incubadoras();

  incubadoras.getIncubadoras().then((a) => {
    
    //console.log(result);

    
    
  }).catch((err) => {
    
  });;
});

module.exports = router;

