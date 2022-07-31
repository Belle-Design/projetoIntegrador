const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');
const bycript = require('bcryptjs')

const cadastroFilePath = path.join(__dirname, '..', 'data', 'cadastroDataBase.json');
const fotosFilePath = path.join(__dirname, '..', 'data', 'cadastroReforma.json');

const clientecontroller = {
    /* cliente: (request, response) => {
        return response.redirect ('/login');
    }, */
    acesso: (request, response)=>{
        const cadastro = JSON.parse(fs.readFileSync(cadastroFilePath, 'utf-8'));
        const cadastroCliente = cadastro.map((cliente)=>{
            return{
                ...cliente
            }
        });

        return response.render('areacliente', { cadastroCliente });
    },
    reformaInfo: (request, response) => {
        
        const cadastro = JSON.parse(fs.readFileSync(cadastroFilePath, 'utf-8'));
        const cadastroCliente = cadastro.map((cliente)=>{
            return{
                ...cliente
            }
        });

        const newReforma = {
            id: uuid(),
            id_cliente: cadastro.id,
            ...request.body,
            fotos: request.files,
        };
        const reforma = JSON.parse(fs.readFileSync(fotosFilePath, 'utf-8'));

        reforma.push(newReforma);

        fs.writeFileSync(fotosFilePath, JSON.stringify(reforma));

      /*   dadosSalvos = {
            nome: cadastro.nome,
            avatar: cadastro.avatar,
            id_cliente: cadastroFound.id
        } */

        return response.render('areacliente', { cadastroCliente });
    }
}


module.exports = clientecontroller;