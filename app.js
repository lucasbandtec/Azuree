var express = require('express');

var app = express();


const server = app.listen(3000);

app.use('/',require('./controller/index'));

console.log("Conectado");