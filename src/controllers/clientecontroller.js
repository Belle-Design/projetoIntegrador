const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');
const bycript = require('bcryptjs')

const cadastroFilePath = path.join(__dirname, '..', 'data', 'cadastroDataBase.json');
const fotosFilePath = path.join(__dirname, '..', 'data', 'cadastroReforma.json');

const clientecontroller = {
    
    acesso: (request, response)=>{
        const cadastro = JSON.parse(fs.readFileSync(cadastroFilePath, 'utf-8'));
        
        const ISSERVER = typeof window === "undefined";

        if (!ISSERVER) {
            let clienteLogado = JSON.parse(localStorage.getItem("clienteLogado"));
        };
        

        return response.render('areacliente', {nome: clienteLogado.nome, avatar: clienteLogado.avatar, id_cliente: clienteLogado.id});
    },
    reformaInfo: (request, response) => {
        
        const cadastro = JSON.parse(fs.readFileSync(cadastroFilePath, 'utf-8'));
        const reforma = JSON.parse(fs.readFileSync(fotosFilePath, 'utf-8'));
      

        const newReforma = {
            id: uuid(),
            id_cliente: clienteLogado.id,
            ...request.body,
            fotos: request.files,
        };

        reforma.push(newReforma);

        fs.writeFileSync(fotosFilePath, JSON.stringify(reforma));

     

        let clienteLogado = localStorage.getItem("clienteLogado");

        return response.render('areacliente', {nome: clienteLogado.nome, avatar: clienteLogado.avatar, id_cliente: clienteLogado.id});
    }
}


module.exports = clientecontroller;