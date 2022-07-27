const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');

const indexrouter = require('../src/routes/indexrouter');
const loginrouter = require('../src/routes/loginrouter');
const cadastrorouter = require('../src/routes/cadastrorouter');
const clienterouter = require('../src/routes/clienterouter');
const harmonizadarouter = require('../src/routes/harmonizadarouter');
const itensrouter = require('../src/routes/itensrouter')


const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'..','public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'BelleDesign2022'
}));

app.use('/', indexrouter);
app.use('/index', indexrouter);
app.use('/login', loginrouter);
app.use('/cadastro', cadastrorouter);
app.use('/areacliente', clienterouter);
app.use('/harmonizada', harmonizadarouter);
app.use('/itens-detalhados', itensrouter);

app.listen(3500, () => {
    console.log('Belle-Design rodando na porta 3500')
})

