var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

const server = app.listen(3000);

//Rotas
app.use('/',require('./controller/index'));
app.use('/incubadoras',require('./controller/incubadoras'));
app.use('/recemNasc',require('./controller/recemNasc'));



app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log("Conectado");