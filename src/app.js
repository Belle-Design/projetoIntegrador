const express = require('express');
const path = require('path');
const indexrouter = require('../src/routes/indexrouter');
const loginrouter = require('../src/routes/loginrouter');
const cadastrorouter = require('../src/routes/cadastrorouter');
const clienterouter = require('../src/routes/clienterouter');

const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'..','public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', indexrouter);
app.use('/index', indexrouter);
app.use('/login', loginrouter);
app.use('/cadastro', cadastrorouter);
app.use('/areacliente', clienterouter);

        app.get('/area-do-cliente', (request, response) => {
            response.render ('areacliente.ejs');
            });

app.listen(3500, () => {
    console.log('Belle-Design rodando na porta 3500')
})

