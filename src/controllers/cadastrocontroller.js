const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');

const cadastroFilePath = path.join(__dirname, '..', 'data', 'cadastroDataBase.json');

const cadastrocontroller = {
    cadastro: (request, response) => {
        response.render ('cadastro');
        },
    saveCadastro:(request, response) => {
        
        const cadastro = JSON.parse(fs.readFileSync(cadastroFilePath, 'utf-8'));

        const newCadastro = {
            id: uuid(),
            ...request.body,
            avatar: request.file.filename
        };

        cadastro.push(newCadastro);

        fs.writeFileSync(
            cadastroFilePath, 
            JSON.stringify(cadastro)
        );
           
        response.redirect('/');
        
    }
}
module.exports = cadastrocontroller;