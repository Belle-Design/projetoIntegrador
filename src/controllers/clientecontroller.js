const fs = require('fs');
const path = require('path');

const cadastroFilePath = path.join(__dirname, '..', 'data', 'cadastroDataBase.json');

const clientecontroller = {
    cliente: (request, response) => {
        return response.redirect ('/login');
    },
    acesso: (request, response)=>{
        const cadastro = JSON.parse(fs.readFileSync(cadastroFilePath, 'utf-8'));
        const cadastroCliente = cadastro.map((cliente)=>{
            return{
                ...cliente
            }
        });

        return response.render('areacliente', { cadastroCliente });
    }
}
module.exports = clientecontroller;