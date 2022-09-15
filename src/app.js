const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');

const indexrouter = require('../src/routes/indexrouter');
const userrouter = require('../src/routes/userrouter');
const harmonizadarouter = require('../src/routes/harmonizadarouter');
const itensrouter = require('../src/routes/itensrouter')
const vantagensrouter = require('../src/routes/vantagensrouter')


const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'BelleDesign2022',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname,'..','public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));

app.use('/', indexrouter);
app.use('/index', indexrouter);
app.use('/user', userrouter);
app.use('/harmonizada', harmonizadarouter);
app.use('/itens-detalhados', itensrouter);


app.use('/vantagens', vantagensrouter);



app.listen(3500, () => {
    console.log('Belle-Design rodando na porta 3500')
})

