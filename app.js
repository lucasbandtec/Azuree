var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//Rotas
app.use('/',require('./controller/index'));
app.use('/incubadoras',require('./controller/incubadoras'));
app.use('/recemNasc',require('./controller/recemNasc'));


const app = express();


app.use(session({
    secret: '123',//configure um segredo seu aqui
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


//view engine setup

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.set(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/incubadoras', incubadorasRouter);
app.use('/recemNascidos', recemNascidosRouter);

console.log("Conectado");