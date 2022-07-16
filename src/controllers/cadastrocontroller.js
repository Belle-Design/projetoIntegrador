const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');
const bcrypt = require('bcryptjs');

const cadastroFilePath = path.join(__dirname, '..', 'data', 'cadastroDataBase.json');

const cadastrocontroller = {
    cadastro: (request, response) => {
        return response.render ('cadastro');
        },
    saveCadastro:(request, response) => {
        const { senha } = request.body;

        const senhaHash = bcrypt.hashSync(senha);
        
        const newCadastro = {
            id: uuid(),
            ...request.body,
            avatar: request.file.filename,
            senha: senhaHash
        };

        const cadastro = JSON.parse(fs.readFileSync(cadastroFilePath, 'utf-8'));

        cadastro.push(newCadastro);

        fs.writeFileSync(
            cadastroFilePath, 
            JSON.stringify(cadastro)
        );
           
        return response.redirect('/');
        
    }
}
module.exports = cadastrocontroller;