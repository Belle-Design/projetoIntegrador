const fs = require('fs');
const path = require('path');

const cadastroFilePath = path.join(__dirname, '..', 'data', 'cadastroDataBase.json');

const cadastrocontroller = {
    cadastro: (request, response) => {
        response.render ('cadastro');
        },
    saveCadastro:(request, response) => {
        const cadastro = JSON.parse(fs.readFileSync(cadastroFilePath, 'utf-8'));

        const newCadastro = {
            id: cadastro.at(-1).id + 1,
            ...request.body
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