var express = require('express');
var router = express.Router(); 
var Incubadoras = require('../service/incubadoraService');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

 
});

module.exports = router;
