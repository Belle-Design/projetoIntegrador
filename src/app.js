const express = require('express');
const path = require('path');

const app = express();

app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'..','public')));

app.get('/', (request, response) => {
response.render ('index.ejs');
});

app.get('/login', (request, response) => {
    response.render ('login.ejs');
    });

    app.get('/cadastro', (request, response) => {
        response.render ('cadastro.ejs');
        });

        app.get('/area-do-cliente', (request, response) => {
            response.render ('areacliente.ejs');
            });

app.listen(3500, () => {
    console.log('Belle-Design rodando na porta 3500')
})

